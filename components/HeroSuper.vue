<script setup>
import { ref, onMounted, onBeforeUnmount } from "vue";

const videoSrc = "/7657449-hd_1920_1080_25fps.mp4";
const canvas = ref(null);
const video = ref(null);
const hero = ref(null);
const canvasReady = ref(false);
let firstFrameDrawn = false;
let stop = false;
let drawLoopStarted = false;

function chromaKey(frame) {
	for (let i = 0; i < frame.data.length; i += 4) {
		const r = frame.data[i];
		const g = frame.data[i + 1];
		const b = frame.data[i + 2];
		if (g > 60 && g > r + 5 && g > b + 5) {
			frame.data[i + 3] = 0;
		}
	}
	return frame;
}

function getCoverDrawParams(srcW, srcH, destW, destH) {
	const srcAR = srcW / srcH;
	const destAR = destW / destH;
	let sw, sh, sx, sy;
	if (destAR > srcAR) {
		sw = srcW;
		sh = srcW / destAR;
		sx = 0;
		sy = (srcH - sh) / 2;
	} else {
		sh = srcH;
		sw = srcH * destAR;
		sy = 0;
		sx = (srcW - sw) / 2;
	}
	return {
		sx: Math.max(0, sx),
		sy: Math.max(0, sy),
		sw: Math.max(1, sw),
		sh: Math.max(1, sh),
		dx: 0,
		dy: 0,
		dw: destW,
		dh: destH,
	};
}

function startDrawLoopIfNeeded() {
	if (!drawLoopStarted) {
		stop = false;
		drawLoopStarted = true;
		drawLoop();
	}
}

function drawLoop() {
	if (stop) return;
	const v = video.value;
	const c = canvas.value;
	const h = hero.value;
	if (!v || !c || !h) return;
	const ctx = c.getContext("2d", { willReadFrequently: true });
	const destW = h.offsetWidth;
	const destH = h.offsetHeight;
	c.width = destW;
	c.height = destH;

	// Only clear when drawing a new frame
	if (v.readyState >= 2 && !v.paused) {
		const { sx, sy, sw, sh, dx, dy, dw, dh } = getCoverDrawParams(
			v.videoWidth,
			v.videoHeight,
			destW,
			destH,
		);
		ctx.clearRect(0, 0, c.width, c.height);
		ctx.drawImage(v, sx, sy, sw, sh, dx, dy, dw, dh);
		let frame = ctx.getImageData(0, 0, c.width, c.height);
		frame = chromaKey(frame);
		ctx.putImageData(frame, 0, 0);

		if (!firstFrameDrawn) {
			firstFrameDrawn = true;
			canvasReady.value = true;
		}
	}
	// Don't clear if not drawing a frame (prevents flashes)
	setTimeout(drawLoop, 40);
}

onMounted(() => {
	stop = false;
	drawLoopStarted = false;
	if (video.value) {
		video.value.muted = true;
		video.value.autoplay = true;
		video.value.loop = true;
		video.value.playsInline = true;
		video.value.play().catch(() => {});
	}
	// Handle all play states for seamless looping
	video.value.addEventListener("play", () => startDrawLoopIfNeeded());
	video.value.addEventListener("canplay", () => startDrawLoopIfNeeded());
	video.value.addEventListener("pause", () => {
		stop = true;
	});
	video.value.addEventListener("ended", () => {
		// Prevent flash: immediately seek to 0 and play
		if (video.value) {
			video.value.currentTime = 0;
			video.value.play();
			// DrawLoop will resume on "play" event
		}
	});
	window.addEventListener("resize", drawLoop);
});

onBeforeUnmount(() => {
	stop = true;
	window.removeEventListener("resize", drawLoop);
});
</script>

<template>
	<section
		ref="hero"
		id="hero-video-section"
		class="relative w-screen h-screen overflow-hidden"
	>
		<transition name="fade">
			<div
				v-if="!canvasReady"
				class="absolute flex items-center justify-center left-1/2 top-1/2 w-[400px] h-[600px] -translate-x-1/2 -translate-y-1/2 z-20 bg-[rgba(30,30,30,0.92)] text-white rounded-2xl shadow-2xl"
			>
				<div
					class="w-full h-full flex flex-col items-center justify-center gap-2 p-4 animate-pulse"
				>
					<span class="text-[2.5rem]">🎬</span>
					<div class="font-bold text-xl">Loading Portfolio...</div>
					<div class="text-center opacity-70">
						Preparing your experience...
					</div>
				</div>
			</div>
		</transition>
		<slot v-if="canvasReady" :video-ready="canvasReady" />
		<canvas
			ref="canvas"
			class="absolute top-0 left-0 w-screen h-screen z-10 pointer-events-none"
		></canvas>
		<video
			ref="video"
			:src="videoSrc"
			width="640"
			height="360"
			autoplay
			muted
			loop
			playsinline
			class="w-0 h-0"
		></video>
	</section>
</template>
