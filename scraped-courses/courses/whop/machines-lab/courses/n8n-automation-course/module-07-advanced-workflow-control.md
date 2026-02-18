# Module 7: Advanced Workflow Control - Loops, Conditions & Error Handling

**Course:** The Ultimate n8n Course
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

---

## 🎯 What You'll Master Today

By the end of this module, you'll:

- **Build** workflows that process large datasets efficiently with loops
- **Implement** sophisticated error handling and retry logic
- **Create** complex decision trees with nested conditions
- **Optimize** workflow performance for high-volume processing
- **Develop** fault-tolerant systems for mission-critical operations

---

## ⚡ Why Advanced Control Flow Is Essential

Simple linear workflows work for basic automation, but real business processes are complex. You need workflows that can:

- Process thousands of records without timing out
- Handle API failures gracefully and retry automatically
- Make complex decisions based on multiple data points
- Continue working even when individual components fail
- Scale efficiently as your business grows

Advanced workflow control transforms brittle automations into robust, enterprise-grade systems.

---

## 🔁 Mastering Loops for Data Processing

### The Split in Batches Node

When processing large datasets, the Split in Batches node prevents timeouts and memory issues:

**Basic Configuration:**

- **Batch Size:** Number of items to process at once (start with 10-50)
- **Options:** Reset after each batch for independent processing

**Example Use Case: Processing 1000 Customer Records**

- **HTTP Request** to fetch customer data
- **Split in Batches** with batch size 25 (creates 40 batches)
- **Processing nodes** for each batch
- **Merge** to combine results

### The Item Lists Node

For transforming and filtering arrays of data:

```javascript
// Function node to process customer data in batches
const customers = $input.all();
const processedBatch = [];

customers.forEach(item => {
    const customer = item.json;

    // Skip invalid records
    if (!customer.email || !customer.email.includes('@')) {
        return;
    }

    // Calculate customer score
    let score = 0;
    score += customer.total_spent > 1000 ? 30 : 10;
    score += customer.email_opens > 5 ? 20 : 5;
    score += customer.days_since_last_purchase < 30 ? 25 : 0;

    processedBatch.push({
        ...customer,
        customer_score: score,
        segment: score > 50 ? 'high_value' : score > 25 ? 'medium_value' : 'low_value',
        processed_at: new Date().toISOString()
    });
});

return processedBatch.map(customer => ({ json: customer }));
```

---

## 🛡️ Building Robust Error Handling

### Try-Catch Pattern with IF Nodes

Create workflows that continue running even when individual operations fail:

**Structure:**

- **Main Process Node** (e.g., API call)
- **IF Node** checking for errors
- **Success Path** for normal processing
- **Error Path** for retry logic or alternative actions

**Error Detection Function:**

```javascript
// Function node to check for errors
const result = $json;

// Check for common error indicators
const hasError = (
    result.error ||
    result.status === 'failed' ||
    result.status_code >= 400 ||
    !result.data
);

return [{
    json: {
        ...result,
        hasError: hasError,
        errorMessage: result.error?.message || result.message || 'Unknown error'
    }
}];
```

### Implementing Retry Logic

Build systems that automatically retry failed operations:

```javascript
// Function node for retry logic
const attempt = parseInt($json.retry_attempt || 0);
const maxRetries = 3;
const baseDelay = 1000; // 1 second

if (attempt >= maxRetries) {
    // Max retries reached - send to error handling
    return [{
        json: {
            ...input,
            final_error: true,
            error_message: 'Max retries exceeded'
        }
    }];
}

// Calculate exponential backoff delay
const delay = baseDelay * Math.pow(2, attempt);

return [{
    json: {
        ...input,
        retry_attempt: attempt + 1,
        retry_delay: delay,
        should_retry: true
    }
}];
```

---

## 🌟 Building a Fault-Tolerant Order Processing System

Let's create a comprehensive order processing workflow that handles high volume and various failure scenarios.

### Step 1: Order Intake with Validation

Start with a **Webhook** trigger for incoming orders, then add validation:

```javascript
// Function node for order validation
const order = $json;
const errors = [];

// Required field validation
const required = ['customer_email', 'items', 'total_amount'];
required.forEach(field => {
    if (!order[field]) {
        errors.push(`Missing required field: ${field}`);
    }
});

// Email format validation
if (order.customer_email && !/^[^\\s@]+@[^\\s@]+\\.[^\\s@]+$/.test(order.customer_email)) {
    errors.push('Invalid email format');
}

// Amount validation
if (order.total_amount && (isNaN(order.total_amount) || order.total_amount <= 0)) {
    errors.push('Invalid order amount');
}

// Items validation
if (order.items && (!Array.isArray(order.items) || order.items.length === 0)) {
    errors.push('Order must contain at least one item');
}

return [{
    json: {
        ...order,
        validation_errors: errors,
        is_valid: errors.length === 0,
        validated_at: new Date().toISOString()
    }
}];
```

### Step 2: Multi-Path Processing with Error Handling

Use **IF** nodes to route valid vs invalid orders:

**Valid Orders Path:**

- **PostgreSQL** node to save order:

```sql
INSERT INTO orders (
    order_id, customer_email, total_amount, items,
    status, created_at, retry_count
) VALUES (
    $1, $2, $3, $4, 'processing', CURRENT_TIMESTAMP, 0
)
ON CONFLICT (order_id) DO UPDATE SET
    retry_count = orders.retry_count + 1,
    updated_at = CURRENT_TIMESTAMP;
```

- **HTTP Request** to payment processor with error handling
- **IF** node to check payment success
- **Split in Batches** for inventory updates (if multiple items)

**Invalid Orders Path:**

- **PostgreSQL** node to log errors
- **Gmail** node to notify admin
- **HTTP Request** to return error response

### Step 3: Payment Processing with Retry Logic

```javascript
// Function node for payment retry logic
const paymentResult = $json;
const currentRetry = parseInt(paymentResult.payment_retry_count || 0);
const maxPaymentRetries = 3;

// Check if payment failed but is retryable
const retryableErrors = ['timeout', 'temporary_failure', 'rate_limited'];
const shouldRetry = (
    paymentResult.payment_failed &&
    currentRetry < maxPaymentRetries &&
    retryableErrors.includes(paymentResult.error_type)
);

if (shouldRetry) {
    // Calculate delay: 5s, 15s, 45s
    const delay = 5000 * Math.pow(3, currentRetry);

    return [{
        json: {
            ...paymentResult,
            should_retry_payment: true,
            payment_retry_count: currentRetry + 1,
            retry_delay: delay
        }
    }];
} else if (paymentResult.payment_failed) {
    return [{
        json: {
            ...paymentResult,
            payment_final_failure: true,
            needs_manual_review: true
        }
    }];
} else {
    return [{
        json: {
            ...paymentResult,
            payment_successful: true
        }
    }];
}
```

### Step 4: Inventory Management with Batch Processing

```javascript
// Function node to prepare inventory updates
const order = $json;
const items = order.items || [];

// Group items by warehouse for efficient processing
const warehouseGroups = {};
items.forEach(item => {
    const warehouse = item.warehouse_id || 'default';
    if (!warehouseGroups[warehouse]) {
        warehouseGroups[warehouse] = [];
    }
    warehouseGroups[warehouse].push({
        product_id: item.product_id,
        quantity_ordered: item.quantity,
        reserved_quantity: item.quantity,
        order_id: order.order_id
    });
});

// Create separate tasks for each warehouse
return Object.keys(warehouseGroups).map(warehouse => ({
    json: {
        warehouse_id: warehouse,
        items: warehouseGroups[warehouse],
        order_id: order.order_id,
        batch_size: warehouseGroups[warehouse].length
    }
}));
```

---

## 🔄 Complex Decision Trees

### Nested IF Conditions

Build sophisticated decision logic:

**Customer Tier Processing:**

```javascript
// Function node for complex customer routing
const customer = $json;
const orderValue = parseFloat(customer.total_amount || 0);
const customerTier = customer.tier || 'standard';
const orderHistory = parseInt(customer.total_orders || 0);

let processingPath = 'standard';
let priorityLevel = 1;
let discountRate = 0;

// VIP customers (tier = premium OR high order value OR frequent buyer)
if (customerTier === 'premium' || orderValue > 1000 || orderHistory > 20) {
    processingPath = 'vip';
    priorityLevel = 3;
    discountRate = 0.15;

    // Ultra VIP for highest value customers
    if (customerTier === 'premium' && orderValue > 2000) {
        processingPath = 'ultra_vip';
        priorityLevel = 5;
        discountRate = 0.20;
    }
}
// Gold tier processing
else if (customerTier === 'gold' || orderValue > 500 || orderHistory > 10) {
    processingPath = 'gold';
    priorityLevel = 2;
    discountRate = 0.10;
}
// First-time customer special handling
else if (orderHistory === 0) {
    processingPath = 'first_time';
    priorityLevel = 2;
    discountRate = 0.15; // Higher discount to encourage repeat business
}

return [{
    json: {
        ...customer,
        processing_path: processingPath,
        priority_level: priorityLevel,
        discount_rate: discountRate,
        estimated_processing_time: priorityLevel * 2 + ' hours'
    }
}];
```

### Switch Node for Multiple Conditions

Use the Switch node when you have many possible outcomes:

**Switch Configuration:**

- **Mode:** Rules
- **Rules:**
  - `{{ $json.processing_path }} === 'ultra_vip'` → Output 1
  - `{{ $json.processing_path }} === 'vip'` → Output 2
  - `{{ $json.processing_path }} === 'gold'` → Output 3
  - `{{ $json.processing_path }} === 'first_time'` → Output 4
  - **Default** → Output 5

---

## ⚡ Performance Optimization Strategies

### Parallel Processing

Process independent tasks simultaneously:

**Structure:**

- **Split** workflow into parallel branches
- Process each branch independently
- **Merge** results when all complete

```javascript
// Function node to create parallel tasks
const order = $json;

const tasks = [
    {
        type: 'email_confirmation',
        data: {
            email: order.customer_email,
            order_id: order.order_id
        }
    },
    {
        type: 'inventory_update',
        data: {
            items: order.items,
            order_id: order.order_id
        }
    },
    {
        type: 'shipping_label',
        data: {
            address: order.shipping_address,
            order_id: order.order_id
        }
    },
    {
        type: 'analytics_tracking',
        data: {
            order_value: order.total_amount,
            customer_id: order.customer_id
        }
    }
];

return tasks.map(task => ({ json: task }));
```

### Caching Strategies

Store frequently accessed data to reduce API calls:

```javascript
// Function node with simple caching
const cacheKey = `product_${$json.product_id}`;
const cachedData = global.cache?.[cacheKey];
const cacheExpiry = 15 * 60 * 1000; // 15 minutes

// Initialize global cache if needed
if (!global.cache) {
    global.cache = {};
    global.cacheTimestamps = {};
}

// Check if cache is still valid
const now = Date.now();
const cacheTimestamp = global.cacheTimestamps[cacheKey];
const isCacheValid = cacheTimestamp && (now - cacheTimestamp) < cacheExpiry;

if (isCacheValid && cachedData) {
    // Return cached data
    return [{
        json: {
            ...cachedData,
            from_cache: true
        }
    }];
} else {
    // Indicate we need to fetch fresh data
    return [{
        json: {
            ...input,
            needs_fresh_data: true,
            cache_key: cacheKey
        }
    }];
}
```

---

## 💪 Practice Prompts

### Prompt 1: Bulk Email Processor with Error Recovery (25 minutes)

Build a system that:

- Processes a list of 500+ email subscribers in batches
- Handles various email service failures (rate limits, invalid emails, service outages)
- Implements retry logic with exponential backoff
- Logs all successes, failures, and retries to a database
- Provides a final summary report of the batch job

### Prompt 2: Multi-Platform Inventory Sync (30 minutes)

Create a workflow that:

- Syncs inventory levels across Shopify, WooCommerce, and a custom API
- Processes updates in parallel for speed
- Handles individual platform failures without affecting others
- Implements conflict resolution when inventory counts differ
- Provides detailed logging and error reporting

### Prompt 3: Customer Journey Orchestrator (35 minutes)

Develop a complex customer journey system that:

- Routes customers through different paths based on multiple criteria (value, engagement, purchase history)
- Implements conditional delays (business hours, customer preferences)
- Handles communication failures with alternative channels
- Includes A/B testing with automatic winner selection
- Provides comprehensive journey analytics and optimization

---

## 🚨 Troubleshooting Advanced Workflows

**Memory and Performance Issues**
- Use Split in Batches for large datasets (start with batch size 25-50)
- Process data in parallel when possible
- Clear unnecessary data between steps
- Monitor execution times and optimize bottlenecks

**Error Handling Failures**
- Always test error conditions explicitly
- Use try-catch patterns with IF nodes
- Implement proper fallback mechanisms
- Log errors comprehensively for debugging

**Complex Logic Debugging**
- Add Function nodes to log intermediate states
- Use descriptive node names
- Test each decision path independently
- Simplify complex conditions into multiple steps

**Retry Logic Problems**
- Set reasonable maximum retry attempts (usually 3-5)
- Implement exponential backoff to avoid overwhelming services
- Distinguish between retryable and permanent failures
- Track retry attempts to prevent infinite loops

---

## 🔧 Advanced Workflow Patterns

### Circuit Breaker Pattern

Prevent system overload during failures:

```javascript
// Function node for circuit breaker logic
const serviceName = 'payment_api';
const failureThreshold = 5;
const resetTimeout = 300000; // 5 minutes

// Initialize circuit breaker state
if (!global.circuitBreakers) {
    global.circuitBreakers = {};
}

const breaker = global.circuitBreakers[serviceName] || {
    failures: 0,
    lastFailureTime: null,
    state: 'closed' // closed, open, half-open
};

const now = Date.now();

// Check if we should reset from open to half-open
if (breaker.state === 'open' &&
    (now - breaker.lastFailureTime) > resetTimeout) {
    breaker.state = 'half-open';
    breaker.failures = 0;
}

// If circuit is open, reject immediately
if (breaker.state === 'open') {
    return [{
        json: {
            circuit_breaker_open: true,
            service: serviceName,
            error: 'Service temporarily unavailable'
        }
    }];
}

// Allow request to proceed
global.circuitBreakers[serviceName] = breaker;
return [{ json: { ...input, circuit_state: breaker.state } }];
```

### Saga Pattern for Distributed Transactions

Handle complex multi-step processes with rollback capability:

```javascript
// Function node for saga orchestration
const sagaSteps = [
    { name: 'reserve_inventory', completed: false, compensate: 'release_inventory' },
    { name: 'process_payment', completed: false, compensate: 'refund_payment' },
    { name: 'create_shipment', completed: false, compensate: 'cancel_shipment' },
    { name: 'send_confirmation', completed: false, compensate: 'send_cancellation' }
];

const currentSaga = $json.saga || {
    id: `saga_${Date.now()}`,
    steps: sagaSteps,
    currentStep: 0,
    status: 'running',
    compensations: []
};

const step = currentSaga.steps[currentSaga.currentStep];

return [{
    json: {
        ...input,
        saga: currentSaga,
        current_step: step,
        saga_id: currentSaga.id
    }
}];
```

---

## 📚 Essential Resources

- **Split in Batches Guide:** [n8n Batch Processing](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.splitinbatches/) - Handle large datasets
- **Error Handling Patterns:** [n8n Error Workflows](https://docs.n8n.io/courses/level-two/chapter-4/) - Comprehensive error handling
- **Switch Node Documentation:** [Switch Logic](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.switch/) - Complex decision trees
- **Performance Best Practices:** [n8n Optimization Guide](https://docs.n8n.io/hosting/scaling/performance/) - Scale your workflows
- **Community Patterns:** [Advanced Workflow Templates](https://n8n.io/workflows/categories/advanced/) - Complex automation examples
- **Function Node Cookbook:** [JavaScript Examples](https://docs.n8n.io/code/cookbook/) - Advanced scripting patterns

---

## 🔮 Coming Up in Module 8

You now have the skills to build enterprise-grade workflows that handle complexity, scale, and failure gracefully! In Module 8, we'll dive into **webhooks and real-time integrations**:

- Building webhook endpoints that respond instantly to external events
- Creating real-time data synchronization between systems
- Implementing secure webhook authentication and validation
- Building event-driven architectures with n8n
- Advanced webhook patterns for complex integrations

We'll create a real-time order processing system that responds instantly to payments, inventory changes, and customer actions across all your platforms.

---

✅ **Module 7 Complete!** Your workflows are now robust, scalable, and intelligent. You can handle enterprise-level complexity with confidence. Ready to master real-time integrations with webhooks in Module 8?
