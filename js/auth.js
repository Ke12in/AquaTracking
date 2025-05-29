// User authentication functions
const users = JSON.parse(localStorage.getItem('users')) || [];

// Function to handle user signup
function handleSignup(event) {
    event.preventDefault();
    
    const formData = new FormData(event.target);
    const userData = {
        fullname: formData.get('fullname'),
        email: formData.get('email'),
        password: formData.get('password'),
        confirm_password: formData.get('confirm_password')
    };

    // Validate passwords match
    if (userData.password !== userData.confirm_password) {
        alert('Passwords do not match!');
        return;
    }

    // Check if user already exists
    if (users.some(user => user.email === userData.email)) {
        alert('User already exists! Please login instead.');
        window.location.href = 'index.html';
        return;
    }

    // Add new user
    users.push({
        fullname: userData.fullname,
        email: userData.email,
        password: userData.password
    });

    // Save to localStorage
    localStorage.setItem('users', JSON.stringify(users));
    
    alert('Account created successfully! Please login.');
    window.location.href = 'index.html';
}

// Function to handle user login
function handleLogin(event) {
    event.preventDefault();
    console.log('Login attempt started');
    
    const formData = new FormData(event.target);
    const email = formData.get('email');
    const password = formData.get('password');
    
    console.log('Attempting login for email:', email);

    // Find user
    const user = users.find(u => u.email === email && u.password === password);
    console.log('User found:', user ? 'Yes' : 'No');

    if (user) {
        // Store logged in user
        localStorage.setItem('currentUser', JSON.stringify(user));
        console.log('User stored in localStorage, redirecting to dashboard...');
        window.location.href = 'dashboard.html';
    } else {
        console.log('Login failed - Invalid credentials');
        alert('Invalid credentials or user does not exist. Please sign up first!');
    }
}

// Add event listeners when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, setting up event listeners');
    const signupForm = document.getElementById('signupForm');
    const loginForm = document.getElementById('loginForm');

    if (signupForm) {
        console.log('Signup form found');
        signupForm.addEventListener('submit', handleSignup);
    }

    if (loginForm) {
        console.log('Login form found');
        loginForm.addEventListener('submit', handleLogin);
    } else {
        console.log('Login form not found!');
    }
}); 