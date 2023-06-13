import Image from "next/image"

export default function IconButton({
  title,
  size
}) {
  return (
    <Image
      src={`/icons/${title}.svg`}
      width={size}
      height={size}
      alt={title}
    />
  )
}