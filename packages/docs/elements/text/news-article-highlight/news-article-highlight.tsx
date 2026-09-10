import {Highlight} from '@remotion/rough-notation';
import React from 'react';
import {
	AbsoluteFill,
	Easing,
	Interactive,
	interpolate,
	useCurrentFrame,
} from 'remotion';

const getHighlightProgress = (frame: number, highlightIndex: number) => {
	const start = 31 + highlightIndex * 29;

	return interpolate(frame, [start, start + 24], [0, 1], {
		easing: [
			Easing.spring({
				allowTail: true,
				damping: 200,
				durationRestThreshold: 0.02,
				mass: 1,
				overshootClamping: false,
				stiffness: 100,
			}),
		],
		extrapolateLeft: 'clamp',
		extrapolateRight: 'clamp',
	});
};

const getWordProgress = (phraseProgress: number, wordIndex: number) => {
	return interpolate(
		phraseProgress,
		[wordIndex / 2, (wordIndex + 1) / 2],
		[0, 1],
		{
			extrapolateLeft: 'clamp',
			extrapolateRight: 'clamp',
		},
	);
};

export const NewsArticleHighlight: React.FC = () => {
	const frame = useCurrentFrame();
	const firstHighlightProgress = getHighlightProgress(frame, 0);
	const secondHighlightProgress = getHighlightProgress(frame, 1);

	return (
		<AbsoluteFill
			style={{
				alignItems: 'center',
				backgroundColor: '#ffffff',
				display: 'flex',
				justifyContent: 'center',
				overflow: 'hidden',
				perspective: 1800,
			}}
		>
			<Interactive.Div
				name="Container"
				style={{
					filter: `blur(${interpolate(frame, [0, 30, 125, 149], [16, 0, 0, 8], {
						easing: Easing.bezier(0.16, 1, 0.3, 1),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					})}px)`,
					height: 458,
					opacity: interpolate(frame, [125, 149], [1, 0], {
						easing: Easing.in(Easing.cubic),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					scale: interpolate(frame, [0, 149], [1, 1.045], {
						easing: Easing.inOut(Easing.quad),
						extrapolateLeft: 'clamp',
						extrapolateRight: 'clamp',
					}),
					transformOrigin: '50% 50%',
					width: 1420,
					willChange: 'filter, opacity, transform',
				}}
			>
				<div
					style={{
						backfaceVisibility: 'hidden',
						height: '100%',
						rotate: `x ${interpolate(frame, [0, 149], [7.5, -7.5], {
							easing: Easing.inOut(Easing.quad),
							extrapolateLeft: 'clamp',
							extrapolateRight: 'clamp',
						})}deg`,
						transformStyle: 'preserve-3d',
						width: '100%',
						willChange: 'transform',
					}}
				>
					<div
						style={{
							backfaceVisibility: 'hidden',
							height: '100%',
							rotate: `y ${interpolate(frame, [0, 149], [-7.5, 7.5], {
								easing: Easing.inOut(Easing.quad),
								extrapolateLeft: 'clamp',
								extrapolateRight: 'clamp',
							})}deg`,
							transformStyle: 'preserve-3d',
							width: '100%',
							willChange: 'transform',
						}}
					>
						<article
							style={{
								backfaceVisibility: 'hidden',
								backgroundColor: '#ffffff',
								boxSizing: 'border-box',
								color: '#181816',
								display: 'flex',
								flexDirection: 'column',
								height: '100%',
								padding: '54px 84px 0',
								transform: 'translateZ(0)',
								width: '100%',
								willChange: 'transform',
							}}
						>
							<Interactive.Div
								name="Article category"
								style={{
									color: '#a0432d',
									fontFamily: 'Arial, Helvetica, sans-serif',
									fontSize: 15,
									fontWeight: 700,
									letterSpacing: 2.6,
									textTransform: 'uppercase',
								}}
							>
								Politics
							</Interactive.Div>

							<h1
								style={{
									fontFamily: "Georgia, 'Times New Roman', serif",
									fontSize: 70,
									fontWeight: 700,
									letterSpacing: -2.8,
									lineHeight: 1.04,
									margin: '14px 0 18px',
									overflowWrap: 'break-word',
									textWrap: 'balance',
								}}
							>
								<Interactive.Span name="Headline opening">
									Markets brace for a
								</Interactive.Span>{' '}
								<Highlight
									name="Highlight 1 · word 1"
									progress={getWordProgress(firstHighlightProgress, 0)}
									bowing={0}
									color="rgba(255, 224, 76, 0.62)"
									maxRandomnessOffset={7}
									padding={{left: 4, right: 4}}
									roughness={2.1}
									seed={1}
								>
									government
								</Highlight>{' '}
								<Highlight
									name="Highlight 1 · word 2"
									progress={getWordProgress(firstHighlightProgress, 1)}
									bowing={0}
									color="rgba(255, 224, 76, 0.62)"
									maxRandomnessOffset={7}
									padding={{left: 4, right: 4}}
									roughness={2.1}
									seed={2}
								>
									shutdown
								</Highlight>{' '}
								<Interactive.Span name="Headline middle">
									as Congress confronts fresh
								</Interactive.Span>{' '}
								<Highlight
									name="Highlight 2 · word 1"
									progress={getWordProgress(secondHighlightProgress, 0)}
									bowing={0}
									color="rgba(255, 224, 76, 0.62)"
									maxRandomnessOffset={7}
									padding={{left: 4, right: 4}}
									roughness={2.1}
									seed={11}
								>
									funding
								</Highlight>{' '}
								<Highlight
									name="Highlight 2 · word 2"
									progress={getWordProgress(secondHighlightProgress, 1)}
									bowing={0}
									color="rgba(255, 224, 76, 0.62)"
									maxRandomnessOffset={7}
									padding={{left: 4, right: 4}}
									roughness={2.1}
									seed={12}
								>
									lapses
								</Highlight>
							</h1>

							<Interactive.P
								name="Summary"
								style={{
									color: '#4c4c48',
									fontFamily: "Georgia, 'Times New Roman', serif",
									fontSize: 25,
									lineHeight: 1.42,
									margin: 0,
									maxWidth: 1080,
								}}
							>
								{
									'Negotiators returned to the Capitol with the deadline\napproaching, but leaders remained divided over a short-term spending agreement.'
								}
							</Interactive.P>
						</article>
					</div>
				</div>
			</Interactive.Div>
		</AbsoluteFill>
	);
};
