<template>
    <div class="input-wrapper" :class="inputWidth" >
        <label class="input-label">{{inputLabel}}<span v-if="validateType=='required'" class="require-mark">*</span></label>
        <input type="text" :value="modelValue" class="input"  :class="{'input-error':errorMess}" @input="$emit('update:modelValue',$event.target.value)">
        <span v-if="errorMess" class="input-error-mess">{{errorMess}}</span>
    </div>
</template>

<script>
export default {
    name:"BaseInput",
    props:["inputLabel","errorMess","inputWidth","validateType","modelValue"],
    emits:['update:modelValue'],
    methods: {
        
    },
    data() {
        return {
            isError:false
        }
    }
}
</script>