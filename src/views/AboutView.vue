<template>
  <v-app>
    <v-main>
      <v-container fluid fill-height>
        <v-row align="center" justify="center" class="fill-height">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar dark color="primary">
                <v-toolbar-title>
                  {{ isAuthenticated ? 'Welcome' : 'Login Page' }}
                </v-toolbar-title>
              </v-toolbar>
              <v-card-text>
                <div v-if="!isAuthenticated" class="login-section">
                  <v-text-field
                    v-model="email"
                    label="Enter your email address"
                    type="email"
                    placeholder="Email"
                    required
                  ></v-text-field>
                  <v-btn @click="handleLogin" :disabled="isLoginInProgress" color="primary">
                    Login with Microsoft
                  </v-btn>
                </div>
                <div v-else class="content-section">
                  <h1>Welcome to the Home Page</h1>
                  <p>You are logged in as {{ email }}!</p>
                  <v-btn @click="handleLogout" color="primary">
                    Logout
                  </v-btn>
                </div>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import { initializeMsal, login, getAccount, logout } from "../msalService";

export default {
  name: "Home",
  data() {
    return {
      email: "",
      isAuthenticated: false,
      isLoginInProgress: false, // Track the login state
    };
  },
  async mounted() {
    await initializeMsal(); // Ensure MSAL is initialized and handleRedirectPromise is called
    const account = getAccount();
    if (account) {
      this.email = account.username; // Set the email if already logged in
      this.isAuthenticated = true;
    }
  },
  methods: {
    async handleLogin() {
      if (!this.email) {
        alert("Please enter your email address.");
        return;
      }

      this.isLoginInProgress = true; // Set login progress state to true

      try {
        await login({ loginHint: this.email });
      } catch (error) {
        console.error("Login failed:", error);
      } finally {
        this.isLoginInProgress = false; // Reset login progress state
      }
    },
    handleLogout() {
      logout();
      this.isAuthenticated = false;
      this.email = ""; // Clear the email on logout
    },
  },
};
</script>
