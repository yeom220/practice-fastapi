<script setup></script>

<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light border-bottom">
        <div class="container-fluid">
            <router-link class="navbar-brand" to="/">Pybo</router-link>
            <button
                class="navbar-toggler"
                type="button"
                data-bs-toggle="collapse"
                data-bstarget="#navbarSupportedContent"
                aria-controls="navbarSupportedContent"
                aria-expanded="false"
                aria-label="Toggle navigation"
            >
                <span class="navbar-toggler-icon" />
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user-create"
                            >화원가입</router-link
                        >
                    </li>
                    <li class="nav-item">
                        <router-link class="nav-link" to="/user-login"
                            >로그인</router-link
                        >
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<style scoped></style>
