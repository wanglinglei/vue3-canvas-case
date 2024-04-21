import { ref, onMounted, onUnmounted, type Ref } from 'vue'

export function useCanvas(render: ({ ctx, canvas }: { ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement }) => void) {
  console.log('useCanvas')
  const ctx: Ref<null> | Ref<CanvasRenderingContext2D> = ref(null);
  onMounted(() => {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    if (canvas) {
      // @ts-ignore
      ctx.value = canvas.getContext("2d");
      // @ts-ignore
      render({ ctx: ctx.value, canvas })
    }
  })

  onUnmounted(() => {
    ctx.value = null;
  })
  return { ctx }
}