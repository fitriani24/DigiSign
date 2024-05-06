const form = document.getElementById('signature-form');
const messageInput = document.getElementById('message');
const signButton = document.getElementById('sign-button');
const signatureOutput = document.getElementById('signature');

// Generate a new DSA key pair
const crypto = window.crypto || window.msCrypto;
const dsaKeyPair = crypto.generateKey({
    name: 'DSA',
    modulusLength: 2048,
});

// Function to sign a message using the DSA key pair
async function signMessage(message) {
    const signature = await crypto.sign({
        name: 'DSA',
        hash: 'SHA-256',
    }, dsaKeyPair.privateKey, message);
    return signature;
}

// Handle form submission
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const message = messageInput.value;
    const signature = await signMessage(message);
    signatureOutput.textContent = `Digital signature: ${signature}`;
});