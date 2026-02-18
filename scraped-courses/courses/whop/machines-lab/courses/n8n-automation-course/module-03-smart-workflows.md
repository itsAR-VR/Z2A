# Module 3: Smart Workflows - Adding Logic and Data Processing

**Course:** The Ultimate n8n Course
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

---

## 🎯 What You'll Master Today

By the end of this module, you'll:

- **Create** branching workflows using IF conditions
- **Transform** and manipulate data with Set and Function nodes
- **Build** intelligent workflows that make decisions automatically
- **Develop** a complete smart order processing system

---

## 🤔 Why Your Workflows Need Intelligence

So far, your workflows follow a straight line: trigger → action → done. But real business processes are more complex. You need workflows that can:

- Send different emails based on customer type
- Apply discounts only to qualifying orders
- Route support tickets based on priority level
- Process data differently for different scenarios

This is where conditional logic transforms simple automations into intelligent business systems.

---

## 🔀 The IF Node: Your Decision Maker

The IF node is like a traffic director for your data. It evaluates conditions and sends data down different paths based on the results.

### Basic IF Node Structure

- **Input:** Data flows in from the previous node
- **Condition:** You set rules to evaluate the data
- **True Output:** Data goes here if condition is met
- **False Output:** Data goes here if condition is not met

### Common IF Node Conditions

- **Equal:** `{{ $json.status }} === 'premium'`
- **Greater than:** `{{ $json.orderAmount }} > 100`
- **Contains:** `{{ $json.email }}.includes('@gmail.com')`
- **Exists:** `{{ $json.phone !== undefined }}`

---

## 🛠️ Data Transformation Nodes

### Set Node: Clean and Organize Data

The Set node lets you:

- Rename fields for clarity
- Add calculated fields
- Remove unnecessary data
- Format data for the next step

Example Set Node configuration:

```json
{
  "customerName": "{{ $json.firstName }} {{ $json.lastName }}",
  "orderTotal": "{{ $json.amount * 1.1 }}",
  "processedDate": "{{ $now.format('YYYY-MM-DD') }}"
}
```

### Function Node: Advanced Data Processing

For complex calculations and transformations, use JavaScript:

```javascript
// Process order items
const items = $input.all();
let totalValue = 0;
let discountEligible = false;

for (const item of items) {
  totalValue += item.json.price * item.json.quantity;

  if (item.json.category === 'premium') {
    discountEligible = true;
  }
}

return [{
  json: {
    orderTotal: totalValue,
    qualifiesForDiscount: discountEligible,
    itemCount: items.length
  }
}];
```

---

## 🏪 Building a Smart E-commerce Order Processor

Let's create an intelligent order processing workflow that handles different customer tiers and order types automatically.

### Step 1: Set Up the Webhook Trigger

- Create a new workflow with a Webhook trigger
- Configure for POST requests
- This will receive order data from your e-commerce platform

### Step 2: Process Customer Data

Add a **Set** node to clean the incoming data:

- **customerName:** `{{ $json.billing.firstName }} {{ $json.billing.lastName }}`
- **email:** `{{ $json.billing.email }}`
- **orderValue:** `{{ $json.total }}`
- **customerTier:** `{{ $json.customer.tier || 'standard' }}`
- **orderItems:** `{{ $json.items.length }}`

### Step 3: Add Customer Tier Logic

Add an **IF** node with condition: `{{ $json.customerTier }} === 'premium'`

### Step 4: Premium Customer Path (True)

After the IF node's True output, add:

- **Set** node for premium processing:
  - **discountRate:** `0.15`
  - **shippingSpeed:** `express`
  - **personalizedMessage:** `Thank you for being a premium customer!`

- **Gmail** node for premium notification:
  - **Subject:** `Premium Order Confirmed - Express Shipping Included`
  - **Message:**

```
Hi {{ $json.customerName }},

Your premium order is confirmed!

Order Details:
- Order Value: ${{ $json.orderValue }}
- Premium Discount: 15% (Already applied)
- Shipping: Express (Free for premium customers)

{{ $json.personalizedMessage }}

Track your order: [tracking-link]

Best regards,
Premium Customer Team
```

### Step 5: Standard Customer Path (False)

After the IF node's False output, add another **IF** node: `{{ $json.orderValue }} > 100`

### High-Value Standard Orders (True):

- **Set** node:
  - **discountRate:** `0.05`
  - **shippingSpeed:** `standard`
  - **message:** `Thank you for your order!`

- **Gmail** node:
  - **Subject:** `Order Confirmed - Free Shipping Included`

### Regular Orders (False):

- **Set** node:
  - **discountRate:** `0`
  - **shippingSpeed:** `economy`
  - **message:** `Thank you for choosing us!`

- **Gmail** node:
  - **Subject:** `Order Confirmed`

### Step 6: Merge and Final Processing

Add a **Merge** node to combine all paths, then add final steps:

- **Google Sheets** node to log all orders
- **HTTP Request** node to notify your fulfillment system

---

## 📊 Advanced Data Processing Techniques

### Working with Arrays

When processing multiple items, use the Function node:

```javascript
// Calculate category totals
const items = $json.items;
const categoryTotals = {};

items.forEach(item => {
  if (!categoryTotals[item.category]) {
    categoryTotals[item.category] = 0;
  }
  categoryTotals[item.category] += item.price * item.quantity;
});

return [{
  json: {
    categoryBreakdown: categoryTotals,
    totalItems: items.length,
    averageItemValue: Object.values(categoryTotals).reduce((a, b) => a + b, 0) / items.length
  }
}];
```

### Data Validation

Add validation before processing:

```javascript
// Validate required fields
const required = ['email', 'total', 'items'];
const missing = [];

required.forEach(field => {
  if (!$json[field]) {
    missing.push(field);
  }
});

if (missing.length > 0) {
  throw new Error(`Missing required fields: ${missing.join(', ')}`);
}

// Validate email format
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
if (!emailRegex.test($json.email)) {
  throw new Error('Invalid email format');
}

return [{ json: $json }];
```

---

## 💪 Practice Prompts

### Prompt 1: Lead Scoring System (15 minutes)

Build a workflow that scores leads based on:

- Email domain (.com = 10 points, .edu = 20 points, .gov = 30 points)
- Company size (1-10 = 5 points, 11-100 = 15 points, 100+ = 25 points)
- Budget (under $1k = 5 points, $1k-$10k = 15 points, $10k+ = 30 points)

Send different welcome emails based on total score ranges.

### Prompt 2: Support Ticket Router (20 minutes)

Create a workflow that:

- Receives support tickets via webhook
- Routes urgent tickets (priority = high OR keywords contain "down", "broken", "urgent") to immediate Slack notification
- Routes billing issues to billing team email
- Routes general questions to standard support queue
- Logs all tickets to Google Sheets with assigned category

### Prompt 3: Dynamic Discount Calculator (15 minutes)

Build a workflow that applies discounts based on multiple factors:

- First-time customers: 10% discount
- Orders over $200: Additional 5% discount
- Premium customers: Additional 15% discount
- Calculate final price and send confirmation email with discount breakdown

---

## 🚨 Troubleshooting Logic and Data Issues

**IF Node Not Working**
- Check your condition syntax carefully
- Use `{{ $json.field }}` format for data references
- Test with simple conditions first
- Use Execute Workflow to see data structure

**Data Missing Between Nodes**
- Verify node connections are correct
- Check that previous nodes completed successfully
- Use Set node to preserve important data
- Debug with `{{ $json }}` to see all available data

**Function Node Errors**
- Check JavaScript syntax
- Use `console.log()` for debugging (visible in execution log)
- Handle undefined values with `|| 'default'`
- Always return an array with json objects

**Merge Node Issues**
- Ensure all input paths have data
- Use "Wait for all inputs" setting when needed
- Check that merged data structure is consistent
- Consider using different merge modes for your use case

---

## 🔧 Best Practices for Smart Workflows

**Keep Logic Simple**
- Use multiple simple IF nodes instead of complex conditions
- Break complex logic into smaller, testable pieces
- Comment your Function node code

**Handle Edge Cases**
- Always plan for missing or unexpected data
- Set default values for optional fields
- Include error handling in Function nodes

**Test Thoroughly**
- Test with different data scenarios
- Use manual trigger for testing logic branches
- Check each path independently before connecting

**Document Your Logic**
- Use descriptive node names
- Add notes to explain complex conditions
- Keep a record of business rules you're implementing

---

## 📚 Essential Resources

- **IF Node Guide:** [Conditional Logic Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.if/) - Complete IF node reference
- **Function Node Examples:** [JavaScript in n8n](https://docs.n8n.io/code/cookbook/) - Code examples and patterns
- **Set Node Tutorial:** [Data Transformation Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.set/) - Field manipulation techniques
- **Merge Strategies:** [Merge Node Documentation](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.merge/) - Combining data flows
- **Expression Reference:** [n8n Expression Library](https://docs.n8n.io/code/expressions/reference/) - All available functions and methods

---

## 🔮 Coming Up in Module 4

Your workflows are now intelligent and can process data dynamically! In Module 4, we'll connect your automations to the wider web with **HTTP requests and API integrations**:

- Making API calls to any web service
- Authenticating with external systems
- Building custom integrations when no built-in node exists
- Creating a complete CRM automation that syncs data across multiple platforms

We'll build a customer data synchronization system that keeps your CRM, email marketing, and analytics platforms perfectly aligned.

---

✅ **Module 3 Complete!** Your workflows can now think, decide, and adapt to different scenarios. You've built the intelligence layer that separates basic automation from sophisticated business systems. Ready to connect with the entire web in Module 4?
