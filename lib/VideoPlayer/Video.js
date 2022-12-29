export default function Video({ videoSrc = '' }) {
  return <video src={videoSrc} controls></video>;
}
