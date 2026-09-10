import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Img,
	Interactive,
	interpolate,
	useCurrentFrame,
	useVideoConfig,
} from 'remotion';

const TARGET_SCALE = 0.38;
const TARGET_HORIZONTAL_CROP = 0.335;
const TARGET_VERTICAL_CROP = 0.06;
const TARGET_MARGIN = 48;

export const PictureInPictureTransition: React.FC = () => {
	const frame = useCurrentFrame();
	const {height, width} = useVideoConfig();
	const progress = interpolate(frame, [15, 50, 100, 135], [0, 1, 1, 0], {
		easing: [
			Easing.bezier(0.65, 0, 0.35, 1),
			Easing.linear,
			Easing.bezier(0.65, 0, 0.35, 1),
		],
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
	const horizontalCrop = TARGET_HORIZONTAL_CROP * progress;
	const verticalCrop = TARGET_VERTICAL_CROP * progress;
	const scale = interpolate(progress, [0, 1], [1, TARGET_SCALE]);
	const targetX =
		width - TARGET_MARGIN - (1 - TARGET_HORIZONTAL_CROP) * width * TARGET_SCALE;
	const targetY = TARGET_MARGIN - TARGET_VERTICAL_CROP * height * TARGET_SCALE;

	return (
		<AbsoluteFill style={{overflow: 'hidden'}}>
			<Interactive.Div
				name="Scene B"
				style={{
					alignItems: 'center',
					color: '#ffffff',
					display: 'flex',
					fontFamily: 'sans-serif',
					fontSize: 240,
					fontWeight: 900,
					inset: 0,
					justifyContent: 'center',
					position: 'absolute',
					textShadow: '0 4px 30px rgba(0, 0, 0, 0.55)',
				}}
			>
				<Img
					alt=""
					name="Scene B background"
					src="https://remotion.media/transition-bg-pink.jpg"
					style={{
						height: '100%',
						objectFit: 'cover',
						position: 'absolute',
						width: '100%',
					}}
				/>
				<div style={{position: 'relative'}}>B</div>
			</Interactive.Div>

			<Interactive.Div
				cropBottom={verticalCrop}
				cropLeft={horizontalCrop}
				cropRight={horizontalCrop}
				cropTop={verticalCrop}
				name="Scene A"
				style={{
					alignItems: 'center',
					borderRadius: interpolate(progress, [0, 1], [0, 48]),
					color: '#ffffff',
					display: 'flex',
					fontFamily: 'sans-serif',
					fontSize: 240,
					fontWeight: 900,
					height,
					justifyContent: 'center',
					overflow: 'hidden',
					position: 'absolute',
					scale,
					textShadow: '0 4px 30px rgba(0, 0, 0, 0.55)',
					transformOrigin: 'top left',
					translate: `${targetX * progress}px ${targetY * progress}px`,
					width,
					willChange: 'transform',
				}}
			>
				<Img
					alt=""
					name="Scene A background"
					src="https://remotion.media/transition-bg-blue.jpg"
					style={{
						height: '100%',
						objectFit: 'cover',
						position: 'absolute',
						width: '100%',
					}}
				/>
				<div style={{position: 'relative'}}>A</div>
			</Interactive.Div>
		</AbsoluteFill>
	);
};
