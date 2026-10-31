/*===============================================
  CYBERBUDDY
  Cyber Awareness Rule-Based Chatbot
  ================================================*/

/*-------------------------------------------------
  1. CONNECT HTML ELEMENTS
  ------------------------------------------------*/
  
const userInput = document.getElementById("user-input");
const chatForm = document.getElementById("chat-form");
const chatinput = document.getElementById("user-input");
const chatMessages = document.getElementById("chat-messages");

const suggestionButtons = 
    document.querySelectorAll(".suggestion");

/*-------------------------------------------------
  2. PRIVACY AND SAFETY CHECK
  ------------------------------------------------*/

// Detect common patterns of sensitive information.
// Never save messages to localStorage or a database.

function containsSensitiveInformation(message) {

    const sensitivePatterns = [
        /\b(?:my\s+)?otp\s*(?:is|:|-)?\s*\d{4,8}\b/i,
        /\b(?:my\s+)?pin\s*(?:is|:|-)?\s*\d{4,6}\b/i,
        /\b(?:cvv|cvc)\s*(?:is|:|-)?\s*\d{3,4,}\b/i,
        /\b(?:card number|account number)\s*(?:is|:|-)?\s\d{8,19}\b/i
    ];

    return sensitivePatterns.some(pattern =>
        pattern.test(message)
    );
}

/*------------------------------------------------
  3. CHATBOT RESPONSE ENGINE
  ------------------------------------------------*/

  function getBotResponse(message) {
    const text = String(message).toLowerCase().trim();

    // EMERGENCY 1: SENSITIVE INFORMATION

    if (containsSensitiveInformation(message)) {

        return `PRIVACY WARNING!

Your message appears to contain senitive information.

For your safety:
1. Never share OTPs, PINs, passwords or card details.
2. Do not send verification codes to anyone.
3. If you exposed banking information, contact your bank.\

Please avoid entering sensitive information in this chat.

CyberBuddy does not need these details to help you.`;
    }

    
    // EMERGENCY 2: SUSPECTED SCAMS

    const scamkeywords = [
        "otp",
        "prize scam",
        "lottery scam",
        "asking for money",
        "asking me for money",
        "urgent payment",
        "send money",
        "transfer money",
        "payment scam",
        "bank scam",
        "fake payment",
        "money fraud"
    ];

    if (scamkeywords.some(word => text.includes(word))) {

        return  `🚨SUSPECTED SCAM ALERT

Stay calm and do not rush into action.

1. Never share your OTP< PIN or password.
2. Do not transfer money to unknown people.
3. Avoid suspicious links and attachments.
4. Verify the request through an independent,
   official contact channel.
5. Contact your bank immediately if money
   or banking information has been exposed.

 INDIA CYBERCRIME REPORTING:

 Helpline: 1930
 Website: https://cybercrime.gov.in/ 

 Remember: Genuine organizations should not
 ask you to disclose your OTP or PIN.`;
    }

    // EMERGENCY 3: COMPROMISED ACCOUNTS

    const accountKeywords = [
        "hacked",
        "compromised",
        "account stolen",
        "account taken over",
        "someone accessed my account",
        "unauthorized login",
        "unauthorised login",
        "account hacked"
    ];

    if (accountKeywords.some(word => text.includes(word))) {

        return `🚨 ACCOUNT SECURITY ALERT

Your account may be compromised

Follow these steps:

1. Visit the official account recovery website.
2. Change your password using a trusted device.
3. Secure your associated email account.
4. Sign out unknown sessions and devices.
5. Revoke suspicious third-party app access.
6. Enable Multi-Factor Authentication (MFA).
7. Check your recovery email and phone number.
8. Inform your contacts if suspicious messages
   were sent from your account.

Never share your recovery codes or OTPs.

If you cannot recover your account,
contact the platform's official support team.`;
    }

    // EMERGENCY 4: SUSPICIOUS LINKS AND FILES


    const linkKeywords = [
        "suspicious link",
        "clicked a link",
        "clicked suspicious",
        "opened suspicious link",
        "downloaded suspicious",
        "unknown attachment",
        "malicious link",
        "suspicious link",
        "suspicious website",
        "phishing link",
        "opened a suspicious file"
    ];

    if (linkKeywords.some(word => text.includes(word))) {

        return `⚠️ SUSPICIOUS LINK OR FILE ALERT

If you clicked a suspicious link:

1. Stop interacting with the website.
2. Do not enter any personal information.
3. Close the suspicious webpage.
4. If you entered a password, change it through
   the official service using a trusted device.
5. If you downloaded a file, do not open it.
6. If you ran a suspicious file, disconnect the
   the affected device from networks if compromise
   is suspected and run a reputable security scan.
7. Contact your bank if financial information
   was exposed.

 IMPORTANT:
 Clicking a link alone does not necessarily mean
 your device has been infected.

 Be careful and take appropriate action.`;
    }

    // TOPIC 1: PHISHING AND EMAIL SCAMS

    const phishingKeywords = [
        "phishing",
        "fake email",
        "suspicious email",
        "fake message",
        "email scam",
        "identify scam",
        "recognize scam",
        "recognise scam",
        "email fraud",
        "fake website",
        "phishing attack"
    ];

    if (phishingKeywords.some(word => text.includes(word))) {

        return `🎣 PHISHING AND EMAIL SCAMS

Phishing is a cyberattack in which criminals
pretend to be trusted organizations or people
to steal information.

How to identify phishing:

1. Check the sender's email address.
2. look for spelling and grammar mistakes.
3. Be careful with urgent messages.
4. Avoid unexpected attachments.
5. Check website domains carefully.
6. Never enter passwords through suspicious links.

SAFETY TIP:
Visit the official website directly instead
of clicking unknown links.

Report phishing messages to the relevant platform.`;
    }



    // TOPIC 2: PASSWORD SECURITY AND MFA

    const passwordKeywords = [
        "password",
        "strong password",
        "password security",
        "two factor",
        "two-factor",
        "2fa",
        "mfa",
        "authentication",
        "password manager",
        "secure my account"
    ];

    if (passwordKeywords.some(word => text.includes(word))) {

        return `🔐 PASSWORD SECURITY

A strong password helps protect your online accounts.

Follow these practices:

1. Create long and unique passwords.
2. Never reuse passwords across websites.
3. Use a reputable password manager.
4. Enable Multi-Factor Authentication (MFA).
5. Never share passwords or verification codes.
6. Change  exposed or compromised passwords.

WHAt IS MFA?

Multi-Factor Authentication adds another
verification step when logging in.

Even if someone obtains your password,
MFA can provide additional protection.

SAFETY TIPS:
Never desclose your OTP or recovery codes.`;
    }

    // TOPIC 3: MALWARE AND SAFE DOWNLOADS
    
    const malwareKeywords = [
        "malware",
        "virus",
        "ransomware",
        "antivirus",
        "safe download",
        "download software",
        "unknown file",
        "computer infection",
        "infected computer",
        "malicious software"
    ];

    if (malwareKeywords.some(word => text.includes(word))) {

        return `🦠 MALWARE AND SAFE DOWNLOADS
        
Malware is malicious software designed to
damage devices, steal information or disrupt systems.

How to stay protected:

1. Download applications form official websites.
2. Avoid cracked and pirated software.
3. Keep your operating system updated.
4. Use reputable security software.
5. Avoid unknown email attachments.
6. Scan suspicious files before opening them.

SAFETY TIP:
Never run files from untrusted sources.

If you suspect an infection, avoid entering
sensitive information on the affected device
and seek trusted technical assistance,`;
    }

    // TOPIC 4: PUBLIC WI-FI AND VPN

    const wifiKeywords = [
        "public wifi",
        "public wi-fi",
        "wifi safety",
        "wi-fi safety",
        "vpn",
        "public network",
        "free wifi",
        "free wi-fi",
        "hotspot",
        "unsecured network"
    ];

    if(wifiKeywords.some(word => text.includes(word))) {

        return `📶 PUBLIC WI-FI AND VPN SAFETY

Public Wi-Fi networks may be insecured and
can expose users to certain cyber risks.

Safety Practices:

1. Prefer trusted Wi-Fi networks.
2. Avoid unknown and suspicious hotspots.
3. Use HTTPS websites.
4. Disable automatic Wi-Fi connections.
5. Use a reputable VPN when appropriate.
6. Avoid sensitive transactions on suspicious networks.

WHAT IS A VPN?

A Virtual private Network encrypts network traffic
between your device and the VPN service.

IMPORTANT:
A VPN does not protect you from every phishing
attack, malware infection or online scam.`;
    }

    // TOPIC 5: SOCIAL ENGINEERING AND PRIVACY

    const privacyKeywords = [
        "social engineering",
        "online privacy",
        "personal information",
        "personal data",
        "privacy detection",
        "data privacy",
        "identify theft",
        "oversharing",
        "app permissions",
        "social media privacy"
    ];

    if (privacyKeywords.some(word => text.includes(word))) {

        return `🛡️  SOCIAL ENGINEERING AND PRIVACY

Social engineering is a technique used by 
attackers to manipulate people into revealing
confidential information or performing unsafe actions.

How to protect yourself:

1. Verify unusual requests independently.
2. Do not trust unexpected calls or messages.
3. Avoid sharing personal information publicly.
4. Review application permissions.
5. Use privacy settings on social media.
6. Never disclose passwords or OTPs.
7. Be cautions of impersonation attempts.

SAFETY TIP:
Think before you click, share or respond.`;
    }

    // FALLBACK RESPONSE

    return `Hello I'm CyberBuddy, your Cyber Safety Assistant.

I couldn't identify the topic of your question.

Here are the areas I can help you with:

 🎣 Phishing and Email Scams
 🔐 Password Security and MFA
 🦠 Malware and Safe Downloads
 📶 Public Wi-Fi and VPN
 🛡️ Social Engineering and Privacy
 🚨 Suspected Scams
 ⚠️ Compromised Accounts
 🔗 Suspicious Links and Files
 
Try asking a question related to one of these topics.

Remember:
Never share your passwords, OTPs, PINs or
banking details in this chat.`;
}

/* ---------------------------------------------
   4. DISPLAY CHAT MESSAGES
   ---------------------------------------------*/

function addMessage(message, sender){

    const messageElement = document.createElement("div");


    messageElement.classList.add("message");

    if (sender ==="user") {

        messageElement.classList.add("user-message");

    } else {

        messageElement.classList.add("bot-message");
    }

    // Display plan text safely, not HTML.

    messageElement.textContent = message;

    chatMessages.appendChild(messageElement);

    // Automatically scroll to the latest message.

    chatMessages.scrollTop = chatMessages.scrollHeight;
}

/* -------------------------------------------------
   5. PROCESS USER QUESTIONS
   -------------------------------------------------*/

function handleUserMessage(message) {

    const cleanMessage = message.trim();

    // Do not process empty messages.

    if (!cleanMessage) {
        return;
    }

    // check for sensitive information before
    // displaying the user's original message.

    if (containsSensitiveInformation(cleanMessage)) {

        addMessage(
            "[Message hidden for your privacy]",
            "user"
        );

        const warning = getBotResponse(cleanMessage);

        addMessage(warning, "bot");

        userInput.value = "";

        return;
   }

   // Display the user's question.

   addMessage(cleanMessage, "user");

   // Generate the chatbot response.

   const response = getBotResponse(cleanMessage);

   // Display the chatbot response.

   addMessage(response, "bot");

   // Clear the input box.

   userInput.value = "";

   // Return focus to the input box.

   userInput.focus();
}

/*-----------------------------------------------
  6. HANDLE FORM SUBMISSION
  -----------------------------------------------*/
chatForm.addEventListener("submit", function(event) {

    event.preventDefault();

    console.log("1. Send button clicked");

    const message = userInput.value;

    console.log("2. Message entered:", message);

    handleUserMessage(message);

    console.log("3. Message processing completed");

});

/*-------------------------------------------------
  7. HANDLE SUGGESTED QUESTION BUTTONS
  -------------------------------------------------*/

suggestionButtons.forEach(function(button) {

    button.addEventListener("click",function() {

        // Read the question from the HTML attribute.

        const question = button.dataset.question;

        // Send the question to the chatbot.

        handleUserMessage(question);

    });

});

/*--------------------------------------------------
  8. INITIALIZATION
  --------------------------------------------------*/

console.log("CyberBuddy chatbot initialized successfully!");







    





    
    