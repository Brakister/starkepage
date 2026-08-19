export default function LazyImage({ src, alt, width, height, className, loading = 'lazy' }) {
  return (
    <img
      src={src}
      alt={alt}
      width={width}
      height={height}
      className={className}
      loading={loading}
      decoding="async"
    />
  )
}
