# Task 1: Form Submission for 123FormBuilder

## Overview
This project involves creating a form on forms.app, setting up a webhook to handle form submissions, sending data to 123FormBuilder and creating a form in it. Follow these steps to set up, run, and test the solution.

## Step 1: Create a Form on forms.app

1. **Go to forms.app:**
   - Navigate to [forms.app](https://forms.app) and log in to your account.

2. **Create a new form:**
   - Click on **Create Form**.
   - Choose **Start from Scratch**.
   - Select **List View**, then click **Next**.
   - Rename the form from "Untitled Form" to **"Form Submission for 123FormBuilder"**.

3. **Add Fields:**
   - From the **Fields** option, select **Short Text**. A field will appear.
     - Change "Type your question here" to **"Form Name"**.
     - Enable the **Required** option in the field settings.
   - Next, select **Yes / No** from the fields.
     - Change "Ask your question here" to **"Form Active"**.
     - Enable the **Required** option and set the default answer to **Yes**.

4. **Design the Form:**
   - Go to the **Design** option.
   - Select **Theme** and choose **Dark Blue**.
   - Click **Save**.

5. **Get the Form URL:**
   - Go to **Share** and copy the form's URL. Open it in a new tab to verify the form's creation.

## Step 2: Set Up a Webhook

1. **Set up the Webhook:**
   - Go back to the previous tab and click the **Connect** button.
   - From the left-side menu, choose **Webhook**, then click **Connect**.
   - Click **Add a Webhook**.

2. **Install ngrok:**
   - Go to [ngrok.com/download](https://ngrok.com/download) and follow the instructions to install ngrok.
   - Once installed, open a command prompt and run the following commands:
     ```bash
     git clone https://github.com/Tamanna871/task task_1
     cd task_1
     npm install
     npm start
     ```

## Step 3: Run the Frontend

1. **Run the React Frontend:**
   - Open a new command prompt and run:
     ```bash
     cd task_1/form_creation
     npm install
     npm start
     ```
   - The React project will open in a new tab.

## Step 4: Run ngrok

1. **Start ngrok:**
   - Open another command prompt and navigate to the folder where you installed ngrok.
   - Run the following command:
     ```yaml
     ngrok http 5000
     ```
   - A forwarding link will appear, such as:
     ```perl
     https://4216-103-115-24-80.ngrok-free.app -> http://localhost:5000
     ```
   - Copy the link (e.g., `https://4216-103-115-24-80.ngrok-free.app`) and add `/webhook` at the end to get the complete URL:
     ```arduino
     https://4216-103-115-24-80.ngrok-free.app/webhook
     ```

2. **Set the Webhook URL:**
   - Paste this URL in the **URL** field of the form which is appeared after clicking 'Add a WEBHOOK'button on forms.app.
   - Click **Save the Webhook**.

## Step 5: Get 123FormBuilder API Token

1. **Generate API Token:**
   - Open another command prompt and run the following command to get your 123FormBuilder API token:
     ```swift
     curl -X POST https://api.123formbuilder.com/v2/token ^
     -H "Content-Type: application/json" ^
     -d "{\"username\": \"your_123formbuilder_account_user_name\", \"password\": \"your_123formbuilder_account_password\"}"
     ```

2. **Submit API Token:**
   - In the React app, provide the API token and submit it.
   - Click the **Go to Form** link. The form.app's form which is created by Tamanna Kawser Chowhdury will appear.
   - Fill in the form and submit it. A Message will appear for you from me.

## Step 6: Test Form Creation

From my end, after submitting this form, a new form will be created on 123FormBuilder. However, from your end, this will not happen because ngrok provides a dynamic public URL that changes every time it is restarted. As a result, my ngrok URL and your ngrok URL are not the same, which is why form creation won’t work for you directly.

To check the form creation functionality of my app, you need to open your created form (via forms.app), provide the necessary information, and click the **Submit** button. After submission, go to your 123FormBuilder account, where you will see that a new form has been created.

## Conclusion
This guide ensures that the application is set up, runs properly, and can be tested successfully. If you encounter any issues, please refer to the project’s documentation or contact support for assistance.

