# Module 9: JavaScript Expressions & Custom Functions - Unlimited Power

**Course:** The Ultimate n8n Course
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

---

## 🎯 What You'll Master Today

By the end of this module, you'll:

- **Write** powerful JavaScript expressions for complex data manipulation
- **Create** custom functions that solve unique business problems
- **Build** reusable code libraries for consistent workflow logic
- **Optimize** JavaScript performance in high-volume scenarios
- **Develop** a sophisticated business rules engine

---

## 🧠 Why JavaScript Unlocks Everything

While n8n's built-in nodes handle 90% of automation needs, JavaScript expressions give you unlimited power for that critical 10%. With custom JavaScript, you can:

- Perform complex calculations that no built-in node can handle
- Create sophisticated business logic unique to your industry
- Process data in ways that would require dozens of standard nodes
- Build intelligent systems that adapt to changing conditions
- Integrate with APIs that have unusual requirements

JavaScript transforms n8n from a workflow tool into a complete business automation platform.

---

## 🔧 JavaScript in n8n: The Fundamentals

### Where JavaScript Lives

**Expressions**: `{{ }}` syntax in any node field
**Function Node**: Full JavaScript environment with multiple inputs/outputs
**Code Node**: Advanced JavaScript with npm packages (n8n Cloud Pro)

### Accessing Data

```javascript
// Current node data
$json.fieldName
$json["field-with-dashes"]

// Previous node data
$node["Node Name"].json.fieldName

// All input items
$input.all()

// Current item index
$itemIndex

// Run information
$workflow.id
$execution.id
$now
```

### Built-in n8n Functions

```javascript
// Date manipulation
$now.format('YYYY-MM-DD')
$now.plus({days: 7})
$now.minus({hours: 2})

// String operations
'hello world'.toTitleCase()
'SHOUTING'.toLowerCase()

// Array operations
[1,2,3].sum()
[{name: 'John'}, {name: 'Jane'}].pluck('name')

// Math operations
Math.round(3.14159, 2)
```

---

## 🏗️ Building Complex Data Processors

Let's create a sophisticated customer scoring system that analyzes multiple data points to determine customer value and lifecycle stage.

### Advanced Customer Scoring Function

```javascript
// Function node for comprehensive customer scoring
const customers = $input.all();
const scoredCustomers = [];

// Scoring weights and thresholds
const config = {
    weights: {
        recency: 0.25,      // How recently they purchased
        frequency: 0.30,    // How often they purchase
        monetary: 0.35,     // How much they spend
        engagement: 0.10    // Email/site engagement
    },
    thresholds: {
        high_value: 80,
        medium_value: 50,
        at_risk: 30
    },
    recency_days: {
        excellent: 30,
        good: 90,
        poor: 180,
        critical: 365
    }
};

customers.forEach(item => {
    const customer = item.json;

    // Calculate recency score (0-100)
    const daysSinceLastPurchase = customer.days_since_last_purchase || 9999;
    let recencyScore = 0;
    if (daysSinceLastPurchase <= config.recency_days.excellent) recencyScore = 100;
    else if (daysSinceLastPurchase <= config.recency_days.good) recencyScore = 75;
    else if (daysSinceLastPurchase <= config.recency_days.poor) recencyScore = 50;
    else if (daysSinceLastPurchase <= config.recency_days.critical) recencyScore = 25;

    // Calculate frequency score (0-100)
    const purchaseFrequency = customer.total_orders || 0;
    const frequencyScore = Math.min(100, Math.log10(purchaseFrequency + 1) * 50);

    // Calculate monetary score (0-100)
    const totalSpent = parseFloat(customer.total_spent || 0);
    const monetaryScore = Math.min(100, Math.log10(totalSpent + 1) * 25);

    // Calculate engagement score (0-100)
    const emailOpens = customer.email_opens_30d || 0;
    const siteVisits = customer.site_visits_30d || 0;
    const engagementScore = Math.min(100, (emailOpens * 5) + (siteVisits * 2));

    // Calculate weighted final score
    const finalScore = (
        (recencyScore * config.weights.recency) +
        (frequencyScore * config.weights.frequency) +
        (monetaryScore * config.weights.monetary) +
        (engagementScore * config.weights.engagement)
    );

    // Determine customer segment
    let segment = 'low_value';
    let lifecycle_stage = 'active';

    if (finalScore >= config.thresholds.high_value) {
        segment = 'high_value';
    } else if (finalScore >= config.thresholds.medium_value) {
        segment = 'medium_value';
    }

    // Determine lifecycle stage
    if (daysSinceLastPurchase > config.recency_days.critical) {
        lifecycle_stage = 'churned';
    } else if (daysSinceLastPurchase > config.recency_days.poor) {
        lifecycle_stage = 'at_risk';
    } else if (purchaseFrequency === 0) {
        lifecycle_stage = 'prospect';
    } else if (purchaseFrequency === 1) {
        lifecycle_stage = 'new_customer';
    }

    scoredCustomers.push({
        ...customer,
        scores: {
            final: Math.round(finalScore),
            recency: Math.round(recencyScore),
            frequency: Math.round(frequencyScore),
            monetary: Math.round(monetaryScore),
            engagement: Math.round(engagementScore)
        },
        segment: segment,
        lifecycle_stage: lifecycle_stage,
        next_action: getRecommendedAction(segment, lifecycle_stage, finalScore),
        scored_at: new Date().toISOString()
    });
});

// Helper function for action recommendations
function getRecommendedAction(segment, stage, score) {
    const actions = {
        high_value: {
            active: 'vip_nurture_sequence',
            at_risk: 'personal_retention_call',
            churned: 'win_back_premium_offer'
        },
        medium_value: {
            active: 'upsell_campaign',
            new_customer: 'onboarding_plus',
            at_risk: 'discount_offer'
        },
        low_value: {
            prospect: 'educational_content',
            active: 'engagement_campaign',
            at_risk: 'reactivation_sequence'
        }
    };

    return actions[segment]?.[stage] || 'standard_nurture';
}

return scoredCustomers.map(customer => ({ json: customer }));
```

---

## 🎨 Advanced String and Data Manipulation

### Dynamic Content Generation

```javascript
// Function node for intelligent content personalization
const customer = $json;

// Content templates based on customer attributes
const contentLibrary = {
    subject_lines: {
        high_value: [
            `${customer.first_name}, your VIP benefits are waiting`,
            `Exclusive preview for our valued customer`,
            `${customer.first_name}, something special inside`
        ],
        new_customer: [
            `Welcome ${customer.first_name}! Here's your next step`,
            `${customer.first_name}, let's get you started`,
            `Your journey begins now, ${customer.first_name}`
        ],
        at_risk: [
            `We miss you, ${customer.first_name}`,
            `${customer.first_name}, come back for 20% off`,
            `Your favorites are on sale, ${customer.first_name}`
        ]
    },

    content_themes: {
        tech_savvy: ['automation', 'efficiency', 'innovation'],
        cost_conscious: ['value', 'savings', 'ROI'],
        quality_focused: ['premium', 'excellence', 'craftsmanship']
    }
};

// Intelligent content selection
function selectContent(customer) {
    const segment = customer.segment || 'medium_value';
    const interests = customer.interests || [];

    // Choose subject line
    const subjectOptions = contentLibrary.subject_lines[segment] || contentLibrary.subject_lines.new_customer;
    const subject = subjectOptions[Math.floor(Math.random() * subjectOptions.length)];

    // Determine content theme based on purchase history
    let theme = 'quality_focused'; // default
    if (interests.includes('automation') || interests.includes('tech')) {
        theme = 'tech_savvy';
    } else if (customer.avg_order_value < 100) {
        theme = 'cost_conscious';
    }

    // Build personalized content
    const personalizations = {
        company_context: customer.company ? ` at ${customer.company}` : '',
        location_context: customer.city ? ` in ${customer.city}` : '',
        purchase_context: customer.last_purchase_category ?
            ` since your ${customer.last_purchase_category} purchase` : '',
        timeline_context: getTimelineContext(customer.days_since_last_purchase)
    };

    return {
        subject_line: subject,
        content_theme: theme,
        personalizations: personalizations,
        recommended_products: getRecommendedProducts(customer),
        urgency_level: getUrgencyLevel(customer)
    };
}

// Helper functions
function getTimelineContext(daysSince) {
    if (daysSince <= 7) return "this week";
    if (daysSince <= 30) return "this month";
    if (daysSince <= 90) return "recently";
    return "it's been a while";
}

function getRecommendedProducts(customer) {
    // Logic to recommend products based on purchase history
    const categories = customer.purchase_categories || [];
    const complementary = {
        'electronics': ['accessories', 'warranties', 'cases'],
        'clothing': ['shoes', 'accessories', 'care_products'],
        'home': ['decor', 'organization', 'maintenance']
    };

    return categories.flatMap(cat => complementary[cat] || []).slice(0, 3);
}

function getUrgencyLevel(customer) {
    if (customer.lifecycle_stage === 'churned') return 'high';
    if (customer.lifecycle_stage === 'at_risk') return 'medium';
    return 'low';
}

const contentStrategy = selectContent(customer);

return [{
    json: {
        ...customer,
        content_strategy: contentStrategy,
        generated_at: new Date().toISOString()
    }
}];
```

---

## 🔄 Complex Data Transformations

### Multi-Source Data Reconciliation

```javascript
// Function node for reconciling customer data across platforms
const inputs = $input.all();

// Group data by customer email
const customerMap = new Map();

inputs.forEach(item => {
    const data = item.json;
    const email = data.email?.toLowerCase().trim();

    if (!email) return;

    if (!customerMap.has(email)) {
        customerMap.set(email, {
            email: email,
            sources: {},
            conflicts: [],
            merged_data: {},
            confidence_score: 0
        });
    }

    const customer = customerMap.get(email);
    customer.sources[data.source] = {
        data: data,
        last_updated: data.updated_at || data.created_at,
        record_count: data.record_count || 1
    };
});

// Reconcile conflicts and merge data
const reconciledCustomers = [];

customerMap.forEach((customer, email) => {
    const sources = customer.sources;
    const sourceNames = Object.keys(sources);

    // Merge strategy: most recent data wins, with weighted confidence
    const merged = {
        email: email,
        first_name: null,
        last_name: null,
        phone: null,
        company: null,
        total_spent: 0,
        total_orders: 0,
        last_purchase_date: null,
        tags: new Set(),
        custom_fields: {}
    };

    const conflicts = [];
    const sourceWeights = {
        'crm': 1.0,          // Highest trust
        'ecommerce': 0.9,
        'email_platform': 0.7,
        'analytics': 0.6,
        'social': 0.4         // Lowest trust
    };

    // Process each field with conflict resolution
    sourceNames.forEach(sourceName => {
        const sourceData = sources[sourceName].data;
        const weight = sourceWeights[sourceName] || 0.5;
        const lastUpdated = sources[sourceName].last_updated;

        // Name fields - use most recent from highest weight source
        ['first_name', 'last_name'].forEach(field => {
            if (sourceData[field] &&
                (!merged[field] ||
                 (weight > (merged[`${field}_weight`] || 0)) ||
                 (weight === merged[`${field}_weight`] && lastUpdated > merged[`${field}_updated`])
                )) {

                if (merged[field] && merged[field] !== sourceData[field]) {
                    conflicts.push({
                        field: field,
                        values: [merged[field], sourceData[field]],
                        sources: [merged[`${field}_source`], sourceName]
                    });
                }

                merged[field] = sourceData[field];
                merged[`${field}_weight`] = weight;
                merged[`${field}_source`] = sourceName;
                merged[`${field}_updated`] = lastUpdated;
            }
        });

        // Numeric fields - use sum or maximum based on logic
        if (sourceData.total_spent) {
            merged.total_spent = Math.max(merged.total_spent, parseFloat(sourceData.total_spent));
        }

        if (sourceData.total_orders) {
            merged.total_orders = Math.max(merged.total_orders, parseInt(sourceData.total_orders));
        }

        // Date fields - use most recent
        if (sourceData.last_purchase_date) {
            const purchaseDate = new Date(sourceData.last_purchase_date);
            if (!merged.last_purchase_date || purchaseDate > new Date(merged.last_purchase_date)) {
                merged.last_purchase_date = sourceData.last_purchase_date;
            }
        }

        // Tags - merge all unique tags
        if (sourceData.tags) {
            const tags = Array.isArray(sourceData.tags) ? sourceData.tags : sourceData.tags.split(',');
            tags.forEach(tag => merged.tags.add(tag.trim()));
        }

        // Custom fields
        if (sourceData.custom_fields) {
            Object.assign(merged.custom_fields, sourceData.custom_fields);
        }
    });

    // Clean up and calculate confidence
    merged.tags = Array.from(merged.tags);
    merged.source_count = sourceNames.length;
    merged.conflicts = conflicts;

    // Calculate confidence score based on source quality and agreement
    let confidenceScore = 0;
    confidenceScore += Math.min(50, sourceNames.length * 10); // More sources = higher confidence
    confidenceScore += sourceNames.reduce((sum, name) => sum + (sourceWeights[name] * 20), 0);
    confidenceScore -= conflicts.length * 5; // Conflicts reduce confidence

    merged.confidence_score = Math.min(100, Math.max(0, Math.round(confidenceScore)));

    // Clean up temporary fields
    Object.keys(merged).forEach(key => {
        if (key.endsWith('_weight') || key.endsWith('_source') || key.endsWith('_updated')) {
            delete merged[key];
        }
    });

    reconciledCustomers.push(merged);
});

return reconciledCustomers.map(customer => ({ json: customer }));
```

---

## 🚀 Performance Optimization Techniques

### Memory-Efficient Data Processing

```javascript
// Function node for processing large datasets efficiently
const BATCH_SIZE = 100;
const items = $input.all();

// Process in chunks to avoid memory issues
function processInChunks(data, chunkSize, processor) {
    const results = [];

    for (let i = 0; i < data.length; i += chunkSize) {
        const chunk = data.slice(i, i + chunkSize);
        const chunkResults = processor(chunk);
        results.push(...chunkResults);

        // Allow garbage collection between chunks
        if (i % (chunkSize * 10) === 0) {
            global.gc && global.gc();
        }
    }

    return results;
}

// Efficient data processor
function processChunk(items) {
    return items.map(item => {
        const data = item.json;

        // Only keep essential fields to reduce memory
        return {
            id: data.id,
            email: data.email,
            score: calculateScore(data),
            processed: true,
            // Remove heavy data after processing
            summary: summarizeData(data)
        };
    }).filter(item => item.score > 0); // Remove unwanted items early
}

function calculateScore(data) {
    // Optimized scoring logic
    const weights = [0.3, 0.4, 0.3];
    const values = [
        data.recency_score || 0,
        data.frequency_score || 0,
        data.monetary_score || 0
    ];

    return weights.reduce((sum, weight, index) => sum + (weight * values[index]), 0);
}

function summarizeData(data) {
    return {
        total_fields: Object.keys(data).length,
        has_email: !!data.email,
        has_phone: !!data.phone,
        data_quality: Object.values(data).filter(v => v !== null && v !== '').length
    };
}

const processedResults = processInChunks(items, BATCH_SIZE, processChunk);

// Return with memory usage info
return [{
    json: {
        results: processedResults,
        processed_count: processedResults.length,
        original_count: items.length,
        memory_efficient: true,
        processing_time: Date.now() - startTime
    }
}];
```

---

## 🏭 Building a Business Rules Engine

### Configurable Rule Processing System

```javascript
// Function node for dynamic business rules engine
const customer = $json;

// Business rules configuration (could come from database)
const businessRules = {
    discount_eligibility: [
        {
            id: 'new_customer_discount',
            conditions: [
                { field: 'total_orders', operator: 'equals', value: 0 },
                { field: 'email_verified', operator: 'equals', value: true }
            ],
            action: { type: 'discount', value: 15, message: 'Welcome discount' }
        },
        {
            id: 'loyalty_discount',
            conditions: [
                { field: 'total_orders', operator: 'greater_than', value: 10 },
                { field: 'total_spent', operator: 'greater_than', value: 500 }
            ],
            action: { type: 'discount', value: 20, message: 'Loyalty reward' }
        },
        {
            id: 'high_value_vip',
            conditions: [
                { field: 'total_spent', operator: 'greater_than', value: 2000 }
            ],
            action: { type: 'upgrade', value: 'vip', message: 'VIP status activated' }
        }
    ],

    communication_rules: [
        {
            id: 'high_frequency_limit',
            conditions: [
                { field: 'emails_sent_7d', operator: 'greater_than', value: 5 }
            ],
            action: { type: 'suppress', message: 'Communication frequency limit reached' }
        },
        {
            id: 'engagement_boost',
            conditions: [
                { field: 'email_opens_30d', operator: 'less_than', value: 2 },
                { field: 'total_orders', operator: 'greater_than', value: 1 }
            ],
            action: { type: 'special_offer', value: 25, message: 'Re-engagement offer' }
        }
    ]
};

// Rule evaluation engine
function evaluateRules(customer, ruleCategories) {
    const results = {
        triggered_rules: [],
        actions_to_take: [],
        rule_evaluation_summary: {}
    };

    Object.keys(ruleCategories).forEach(category => {
        const rules = ruleCategories[category];
        const categoryResults = [];

        rules.forEach(rule => {
            const ruleResult = evaluateRule(customer, rule);
            categoryResults.push(ruleResult);

            if (ruleResult.triggered) {
                results.triggered_rules.push({
                    category: category,
                    rule_id: rule.id,
                    action: rule.action
                });
                results.actions_to_take.push(rule.action);
            }
        });

        results.rule_evaluation_summary[category] = {
            total_rules: rules.length,
            triggered_rules: categoryResults.filter(r => r.triggered).length,
            evaluation_time: categoryResults.reduce((sum, r) => sum + r.evaluation_time, 0)
        };
    });

    return results;
}

function evaluateRule(customer, rule) {
    const startTime = Date.now();

    const conditionResults = rule.conditions.map(condition => {
        return evaluateCondition(customer, condition);
    });

    // All conditions must be true for rule to trigger
    const triggered = conditionResults.every(result => result);

    return {
        rule_id: rule.id,
        triggered: triggered,
        condition_results: conditionResults,
        evaluation_time: Date.now() - startTime
    };
}

function evaluateCondition(customer, condition) {
    const fieldValue = getFieldValue(customer, condition.field);
    const targetValue = condition.value;

    switch (condition.operator) {
        case 'equals':
            return fieldValue === targetValue;
        case 'not_equals':
            return fieldValue !== targetValue;
        case 'greater_than':
            return parseFloat(fieldValue || 0) > parseFloat(targetValue);
        case 'less_than':
            return parseFloat(fieldValue || 0) < parseFloat(targetValue);
        case 'greater_than_or_equal':
            return parseFloat(fieldValue || 0) >= parseFloat(targetValue);
        case 'less_than_or_equal':
            return parseFloat(fieldValue || 0) <= parseFloat(targetValue);
        case 'contains':
            return String(fieldValue || '').toLowerCase().includes(String(targetValue).toLowerCase());
        case 'not_contains':
            return !String(fieldValue || '').toLowerCase().includes(String(targetValue).toLowerCase());
        case 'in_array':
            return Array.isArray(targetValue) && targetValue.includes(fieldValue);
        case 'not_in_array':
            return Array.isArray(targetValue) && !targetValue.includes(fieldValue);
        default:
            return false;
    }
}

function getFieldValue(customer, fieldPath) {
    return fieldPath.split('.').reduce((obj, key) => obj?.[key], customer);
}

// Execute rules evaluation
const ruleResults = evaluateRules(customer, businessRules);

return [{
    json: {
        customer_id: customer.id || customer.email,
        rule_results: ruleResults,
        actions_summary: {
            total_actions: ruleResults.actions_to_take.length,
            discounts: ruleResults.actions_to_take.filter(a => a.type === 'discount'),
            upgrades: ruleResults.actions_to_take.filter(a => a.type === 'upgrade'),
            suppressions: ruleResults.actions_to_take.filter(a => a.type === 'suppress')
        },
        evaluation_timestamp: new Date().toISOString()
    }
}];
```

---

## 💪 Practice Prompts

### Prompt 1: Dynamic Pricing Engine (25 minutes)

Build a JavaScript function that:

- Calculates product pricing based on multiple factors (demand, inventory, competition, customer tier)
- Implements surge pricing for high-demand periods
- Applies personalized discounts based on customer behavior
- Handles edge cases like minimum margins and maximum discount limits
- Returns detailed pricing breakdown and reasoning

### Prompt 2: Intelligent Content Router (30 minutes)

Create a system that:

- Analyzes customer data to determine optimal content type and timing
- Routes customers to different email sequences based on engagement patterns
- Implements A/B testing logic with automatic winner selection
- Handles content fatigue detection and variety injection
- Provides detailed routing decisions and performance metrics

### Prompt 3: Advanced Data Quality Processor (30 minutes)

Develop a comprehensive data quality system that:

- Validates and cleanses customer data from multiple sources
- Detects and resolves duplicate records with confidence scoring
- Standardizes address, phone, and name formats
- Identifies and flags suspicious or fake data
- Generates data quality reports with improvement recommendations

---

## 🚨 Troubleshooting JavaScript Issues

**Syntax and Runtime Errors**
- Use `console.log()` extensively for debugging
- Check for undefined variables and null values
- Validate data types before operations
- Use try-catch blocks for error-prone operations

**Performance Problems**
- Avoid nested loops with large datasets
- Process data in chunks for memory efficiency
- Use appropriate data structures (Map vs Object, Set vs Array)
- Clear unused variables to help garbage collection

**Data Access Issues**
- Verify node names match exactly (case-sensitive)
- Use `$json` vs `$input.all()` appropriately
- Check that data exists before accessing nested properties
- Handle empty or malformed input gracefully

**Complex Logic Debugging**
- Break complex functions into smaller, testable pieces
- Log intermediate values and decision points
- Test with simplified data sets first
- Use descriptive variable names and comments

---

## 🔧 Advanced JavaScript Patterns

### Memoization for Performance

```javascript
// Cache expensive calculations
const memoize = (fn) => {
    const cache = new Map();
    return (...args) => {
        const key = JSON.stringify(args);
        if (cache.has(key)) {
            return cache.get(key);
        }
        const result = fn(...args);
        cache.set(key, result);
        return result;
    };
};

const expensiveCalculation = memoize((customer) => {
    // Complex calculation that benefits from caching
    return calculateCustomerLifetimeValue(customer);
});
```

### Factory Pattern for Dynamic Processing

```javascript
// Dynamic processor creation
function createProcessor(type) {
    const processors = {
        email: (data) => ({ ...data, processed_by: 'email_processor' }),
        sms: (data) => ({ ...data, processed_by: 'sms_processor' }),
        push: (data) => ({ ...data, processed_by: 'push_processor' })
    };

    return processors[type] || processors.email;
}

const processor = createProcessor($json.communication_type);
const result = processor($json);
```

---

## 📚 Essential Resources

- **Function Node Guide:** [n8n JavaScript Functions](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.function/) - Complete Function node reference
- **Expression Reference:** [n8n Expression Syntax](https://docs.n8n.io/code/expressions/reference/) - All available methods and functions
- **JavaScript Cookbook:** [Code Examples](https://docs.n8n.io/code/cookbook/) - Practical JavaScript patterns
- **Performance Guide:** [Optimizing Workflows](https://docs.n8n.io/hosting/scaling/performance/) - JavaScript optimization tips
- **Community Scripts:** [JavaScript Templates](https://n8n.io/workflows/categories/code/) - Real-world JavaScript examples
- **MDN JavaScript:** [JavaScript Reference](https://developer.mozilla.org/en-US/docs/Web/JavaScript) - Complete language documentation

---

## 🔮 Coming Up in Module 10

You now have unlimited power to create custom business logic and data processing systems! In Module 10, we'll explore **AI integrations and intelligent automation**:

- Integrating ChatGPT, Claude, and other AI models into workflows
- Building AI-powered decision making systems
- Creating intelligent content generation pipelines
- Implementing AI-driven customer service automation
- Advanced prompt engineering for business automation

We'll build an AI-powered business assistant that can analyze data, make decisions, generate content, and interact with customers autonomously.

---

✅ **Module 9 Complete!** You can now solve any business logic challenge with custom JavaScript. Your workflows have unlimited power to process, analyze, and transform data exactly how your business needs it. Ready to add AI intelligence to your automations in Module 10?
