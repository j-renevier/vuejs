import { onMounted, onUnmounted, ref } from "vue"

const useTimer = (init = 0) => {
  const time = ref(init)

  let timer : ReturnType<typeof setInterval>; 
  onMounted(() => {
    timer = setInterval(() => {
      time.value++ 
    }, 1000)
  })

  onUnmounted(() => {
    clearInterval(timer)
  })

  return {
    time, 
    reset: () => time.value = 0
  }
}

export default useTimer