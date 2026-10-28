interface AvatarProps {
  name: string
  photoURL: string | null
  size?: 'sm' | 'md'
}

/** 프로필 사진. 이름이 바로 옆에 함께 표시되므로 사진은 장식용(alt="")으로 둡니다. */
export default function Avatar({ name, photoURL, size = 'md' }: AvatarProps) {
  const dim = size === 'sm' ? 'h-7 w-7 text-xs' : 'h-9 w-9 text-sm'
  if (photoURL) {
    return <img src={photoURL} alt="" referrerPolicy="no-referrer" className={`${dim} shrink-0 rounded-full object-cover ring-1 ring-slate-200 dark:ring-white/10`} />
  }
  return (
    <span aria-hidden="true" className={`${dim} flex shrink-0 items-center justify-center rounded-full bg-brand-800 font-semibold text-accent-200`}>
      {name.slice(0, 1)}
    </span>
  )
}
