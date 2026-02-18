# Module 1: Welcome to n8n

**Course:** The Ultimate n8n Course
**Platform:** Whop (Machines Lab)
**URL:** https://whop.com/joined/machines-lab/the-full-n8n-automation-course-qPR2uj0EAxhIOd/app/

---

## 🎯 What You'll Master Today

By the end of this module, you'll:

- **Understand** what n8n is and why it's essential for business automation
- **Navigate** the n8n Cloud interface with confidence
- **Create** your first simple workflow and see it execute successfully

---

## 🤖 What is n8n?

n8n is a visual workflow automation platform that connects your business tools and automates repetitive tasks. Instead of manually copying data between systems or sending routine emails, n8n creates automated workflows that handle these processes for you.

### Key n8n Advantages

**Execution-Based Pricing**
Unlike other platforms that charge per task, n8n charges per complete workflow execution. A workflow with 50 steps costs the same as one with 5 steps.

**AI Integration**
Built-in support for ChatGPT, Claude, and other AI models means your workflows can analyze data, generate content, and make intelligent decisions.

**Visual Workflow Builder**
Drag-and-drop interface makes complex automations easy to build and understand.

**400+ Integrations**
Connect with popular tools like Gmail, Shopify, Slack, Google Sheets, and hundreds more.

---

## 🧭 Navigating the n8n Interface

When you log into n8n Cloud, you'll see these main areas:

### The Dashboard

- **Workflows:** Your list of automations
- **Executions:** History of workflow runs
- **Credentials:** Stored login information for connected services
- **Templates:** Pre-built workflows you can use

### The Workflow Editor

- **Node Panel (Left):** Available integrations and tools
- **Canvas (Center):** Where you build your workflows
- **Node Settings (Right):** Configuration options for each step
- **Execute Button:** Test your workflows

---

## 🔧 Building Your First Workflow

Let's create a simple email automation workflow:

### Step 1: Create a New Workflow

- Click **"New Workflow"** from your dashboard
- You'll see a canvas with a "Manual Trigger" node already added
- The Manual Trigger lets you test workflows by clicking a button

### Step 2: Add an Email Node

- Click the **"+"** button next to the Manual Trigger
- Search for "Gmail" and select it
- Choose **"Send Email"** as the operation

### Step 3: Configure the Email

Fill in these fields:

- **To:** `recipient@example.com`
- **Subject:** `Welcome to our newsletter!`
- **Message:**

```
Hello!

Thank you for subscribing to our newsletter.

You can expect weekly updates with valuable content.

Best regards,
Your Team
```

### Step 4: Connect and Test

- The nodes should automatically connect with a gray line
- Set up your Gmail credentials when prompted
- Click **"Test workflow"** to send the email

---

## 🧩 Understanding Workflow Components

**Nodes:** Individual steps that perform specific actions
- Each node has inputs and outputs
- Data flows from one node to the next

**Connections:** Lines that show data flow between nodes
- Information moves from left to right
- Multiple nodes can connect to share data

**Executions:** When your workflow actually runs
- Manual executions for testing
- Automatic executions triggered by events

---

## 💪 Practice Prompts

### Prompt 1: Customize Your Email (10 minutes)

Modify your welcome email to:
- Add your company name to the subject line
- Include your website URL in the message
- Change the recipient to your own email address and test

### Prompt 2: Create a Follow-up Workflow (15 minutes)

Build a second workflow that:
- Uses a Manual Trigger
- Sends a "Thanks for your purchase" email
- Includes order details in the message body

---

## 🚨 Troubleshooting Common Issues

**Workflow Won't Execute**
- Check that all nodes are connected (gray lines between them)
- Verify your credentials are set up correctly
- Look for red error indicators on nodes

**Can't Find a Node**
- Use the search function in the node selection panel
- Try different keywords (e.g., "Email" instead of "Gmail")
- Browse categories in the node panel

**Email Didn't Send**
- Check your Gmail credentials
- Look in your spam folder
- Review the execution log for error messages

---

## 📚 Essential Resources

- **Official Documentation:** [n8n Getting Started Guide](https://docs.n8n.io/getting-started/) - Complete setup instructions
- **Community Templates:** [Email Automation Workflows](https://n8n.io/workflows/categories/marketing/) - Ready-to-use templates
- **Gmail Setup Guide:** [Gmail Node Documentation](https://docs.n8n.io/integrations/builtin/app-nodes/n8n-nodes-base.gmail/) - Authentication help
- **Community Support:** [n8n Discord Server](https://discord.gg/n8n) - Get help from other users
- **Video Tutorials:** [n8n YouTube Channel](https://www.youtube.com/c/n8n-io) - Visual learning resources

---

## 🔮 Coming Up in Module 2

In the next module, we'll explore **triggers** - the events that automatically start your workflows. You'll learn how to:

- Set up webhook triggers for instant automation
- Use schedule triggers for recurring tasks
- Connect real business events like form submissions
- Build workflows that run completely automatically

We'll create your first truly automated workflow that captures leads and adds them to your email list without any manual work.

---

✅ **Module 1 Complete!** You've successfully built your first n8n workflow and understand the basic interface. Ready to make your automations truly automatic? Let's dive into triggers in Module 2.
