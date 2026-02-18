# Module 4: HTTP Requests & API Integrations - Connecting to Any Service

**Course:** The Ultimate n8n Course
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

---

## 🎯 What You'll Master Today

By the end of this module, you'll:

- **Master** HTTP Request nodes to connect with any web API
- **Implement** authentication methods for secure API access
- **Build** custom integrations when no built-in node exists
- **Create** a multi-platform data synchronization system

---

## 🔗 Why HTTP Requests Unlock Unlimited Possibilities

While n8n has 400+ built-in integrations, there are millions of web services and APIs out there. The HTTP Request node is your universal key to connect with any service that has an API, including:

- Custom business applications
- Niche SaaS tools
- Internal company systems
- New services without n8n integrations yet
- Legacy systems with REST APIs

Master HTTP requests, and you can integrate with virtually anything.

---

## 📡 Understanding HTTP Request Basics

### The Four Essential HTTP Methods

**GET:** Retrieve data from a server
- Getting customer information from a CRM
- Fetching product details from an inventory system
- Reading data from analytics platforms

**POST:** Send new data to create resources
- Creating new contacts in a system
- Submitting form data
- Adding new records to databases

**PUT/PATCH:** Update existing data
- Modifying customer information
- Updating inventory quantities
- Changing user preferences

**DELETE:** Remove data from systems
- Deleting old records
- Removing outdated information
- Cleaning up test data

### HTTP Request Components

**URL:** The endpoint address `https://api.example.com/v1/customers`

**Headers:** Additional information about the request

```json
{
  "Content-Type": "application/json",
  "Authorization": "Bearer your-token-here"
}
```

**Body:** Data you're sending (for POST/PUT requests)

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "company": "Acme Corp"
}
```

---

## 🔐 Authentication Methods

### API Key Authentication

The simplest method - add your key to headers:

```json
{
  "X-API-Key": "your-api-key-here"
}
```

### Bearer Token Authentication

Common for modern APIs:

```json
{
  "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

### Basic Authentication

Username and password encoded:

```json
{
  "Authorization": "Basic dXNlcm5hbWU6cGFzc3dvcmQ="
}
```

### OAuth 2.0

For complex authentication flows - often handled by dedicated credential types in n8n.

---

## 🏗️ Building Your First Custom API Integration

Let's create a workflow that syncs customer data between a CRM system and an email marketing platform using HTTP requests.

### Step 1: Set Up the Trigger

- Create a new workflow
- Add a **Schedule Trigger** set to run daily at 9 AM
- This will sync new customers added in the last 24 hours

### Step 2: Fetch New Customers from CRM

Add an **HTTP Request** node with these settings:

- **Method:** GET
- **URL:** `https://api.yourcrm.com/v1/customers`
- **Query Parameters:**
  - `created_since`: `{{ $now.minus({days: 1}).toISO() }}`
  - `limit`: `100`
- **Headers:**
  - `Authorization`: `Bearer {{ $credentials.crmToken }}`
  - `Content-Type`: `application/json`

### Step 3: Process Customer Data

Add a **Function** node to format data for the email platform:

```javascript
// Transform CRM data to email platform format
const customers = $json.customers || [];
const transformedCustomers = [];

customers.forEach(customer => {
  // Only process customers with valid emails
  if (customer.email && customer.email.includes('@')) {
    transformedCustomers.push({
      email: customer.email,
      first_name: customer.first_name,
      last_name: customer.last_name,
      company: customer.company,
      source: 'CRM_SYNC',
      tags: ['new_customer', 'crm_import']
    });
  }
});

return transformedCustomers.map(customer => ({ json: customer }));
```

### Step 4: Add Customers to Email Platform

Add another **HTTP Request** node:

- **Method:** POST
- **URL:** `https://api.emailplatform.com/v1/contacts`
- **Headers:**
  - `Authorization`: `Bearer {{ $credentials.emailToken }}`
  - `Content-Type`: `application/json`
- **Body:**

```json
{
  "email": "{{ $json.email }}",
  "first_name": "{{ $json.first_name }}",
  "last_name": "{{ $json.last_name }}",
  "custom_fields": {
    "company": "{{ $json.company }}",
    "source": "{{ $json.source }}"
  },
  "tags": {{ JSON.stringify($json.tags) }}
}
```

### Step 5: Log Results

Add a **Google Sheets** node to track synchronization:

- **Operation:** Append
- **Spreadsheet:** Customer Sync Log
- **Data:**
  - **Date:** `{{ $now.format('YYYY-MM-DD HH:mm:ss') }}`
  - **Customers Synced:** `{{ $runIndex + 1 }}`
  - **Email:** `{{ $json.email }}`
  - **Status:** `Success`

---

## 🔄 Handling API Responses and Errors

### Processing API Responses

APIs return data in different formats. Use these techniques:

**Extract specific data:**

```javascript
// If API returns: {"data": {"customers": [...]}, "total": 50}
const customers = $json.data.customers;
const totalCount = $json.total;

return customers.map(customer => ({ json: customer }));
```

**Handle pagination:**

```javascript
// Collect data from multiple pages
let allData = [];
let currentPage = $json.data;

while (currentPage.next_page_url) {
  // Make another HTTP request for next page
  allData = allData.concat(currentPage.items);
}

return allData.map(item => ({ json: item }));
```

### Error Handling

Always plan for API failures:

```javascript
// Check if API call was successful
if ($json.error) {
  throw new Error(`API Error: ${$json.error.message}`);
}

// Validate required data exists
if (!$json.data || !Array.isArray($json.data)) {
  throw new Error('Invalid API response format');
}

return [{ json: $json.data }];
```

---

## 🛡️ Security Best Practices

### Never Hardcode Credentials

❌ **Don't do this:**

```json
{
  "Authorization": "Bearer sk-1234567890abcdef"
}
```

✅ **Do this instead:**

```json
{
  "Authorization": "Bearer {{ $credentials.myApiKey }}"
}
```

### Use Environment Variables

Store sensitive data in n8n credentials:

- Go to Settings → Credentials
- Add new credential type
- Reference with `{{ $credentials.credentialName }}`

### Validate SSL Certificates

Always use HTTPS endpoints and verify certificates are valid.

### Rate Limiting

Respect API rate limits:

- Add delays between requests if needed
- Use the **Wait** node for throttling
- Implement retry logic for rate limit responses

---

## 💪 Practice Prompts

### Prompt 1: Weather-Based Marketing (20 minutes)

Build a workflow that:
- Gets weather data for your city using a free weather API
- If it's going to rain tomorrow, sends promotional emails for umbrellas/raincoats
- If it's going to be sunny, sends promotions for sunglasses/outdoor gear
- Logs all weather checks and promotional sends to Google Sheets

### Prompt 2: Social Media Monitoring (25 minutes)

Create a system that:
- Uses a social media API to search for mentions of your brand
- Analyzes sentiment (positive/negative) using a simple keyword check
- Posts positive mentions to a Slack channel
- Emails you about negative mentions for immediate response
- Stores all mentions in a database for reporting

### Prompt 3: Inventory Alert System (15 minutes)

Build a workflow that:
- Checks your e-commerce platform's inventory levels via API
- Identifies products with low stock (under 10 units)
- Sends different alerts based on product value (high-value items get immediate alerts)
- Updates a Google Sheet with current stock levels
- Can be triggered manually or scheduled hourly

---

## 🚨 Troubleshooting API Integration Issues

**HTTP Request Fails**
- Check the API endpoint URL is correct
- Verify authentication credentials are valid
- Ensure required headers are included
- Test the API call outside n8n first (using Postman or curl)

**Authentication Errors (401/403)**
- Double-check your API key or token
- Verify the authentication method is correct
- Check if credentials have expired
- Ensure proper permission scopes are granted

**Data Format Issues**
- Use `{{ $json }}` to inspect the actual API response
- Check if the API returns data in a different structure than expected
- Handle cases where expected fields might be missing
- Validate data types before processing

**Rate Limiting (429 errors)**
- Add **Wait** nodes between requests
- Implement exponential backoff retry logic
- Check API documentation for rate limits
- Consider caching frequently accessed data

---

## 🔧 Advanced HTTP Request Techniques

### Dynamic URL Construction

```javascript
// Build URLs dynamically
const baseUrl = 'https://api.example.com/v1';
const endpoint = 'customers';
const customerId = $json.customer_id;

const fullUrl = `${baseUrl}/${endpoint}/${customerId}`;

return [{ json: { url: fullUrl } }];
```

### Custom Headers with Variables

```json
{
  "Authorization": "Bearer {{ $credentials.apiToken }}",
  "X-Client-ID": "{{ $json.clientId }}",
  "X-Request-ID": "{{ $runIndex }}-{{ $now.toMillis() }}"
}
```

### Handling Different Content Types

For XML APIs:

```json
{
  "Content-Type": "application/xml"
}
```

For form data:

```json
{
  "Content-Type": "application/x-www-form-urlencoded"
}
```

### Response Data Transformation

```javascript
// Transform API response for next nodes
const rawData = $json;

// Extract and rename fields
const transformed = {
  id: rawData.customer_id,
  fullName: `${rawData.first_name} ${rawData.last_name}`,
  email: rawData.email_address,
  signupDate: rawData.created_at,
  isActive: rawData.status === 'active'
};

return [{ json: transformed }];
```

---

## 📚 Essential Resources

- **HTTP Request Documentation:** [n8n HTTP Request Node Guide](https://docs.n8n.io/integrations/builtin/core-nodes/n8n-nodes-base.httprequest/) - Complete reference
- **API Testing Tool:** [Postman](https://www.postman.com/) - Test APIs before building workflows
- **Free APIs Directory:** [Public APIs List](https://github.com/public-apis/public-apis) - Thousands of free APIs to practice with
- **Authentication Guide:** [n8n Credentials System](https://docs.n8n.io/credentials/) - Secure credential management
- **Community Templates:** [API Integration Workflows](https://n8n.io/workflows/categories/api/) - Real-world examples
- **JSON Tools:** [JSON Formatter](https://jsonformatter.org/) - Format and validate API responses

---

## 🔮 Coming Up in Module 5

You can now connect n8n to virtually any web service! In Module 5, we'll focus on **database integrations and data management**:

- Connecting to SQL databases (MySQL, PostgreSQL)
- Working with NoSQL databases (MongoDB)
- Building data pipelines that sync information across systems
- Creating backup and recovery automations
- Advanced data querying and reporting workflows

We'll build a complete customer data warehouse that aggregates information from multiple sources and provides real-time business insights.

---

✅ **Module 4 Complete!** You now have the power to integrate with any web service or API. Your automation possibilities are truly unlimited. Ready to master data management and database integrations in Module 5?
