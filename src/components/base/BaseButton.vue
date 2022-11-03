<template>
    <button class="btn" :class="{'btn-secondary' : isSecondary}">{{btnText}}</button>
</template>

<script>
export default {
    name:"BaseButton",
    props:{
        isSecondary:{
            type: Boolean,
            default: false
        },
        btnText: {
            type: String,
            default:"Button"
        }
    }
}
</script>