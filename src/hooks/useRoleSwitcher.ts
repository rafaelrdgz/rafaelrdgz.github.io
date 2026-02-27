import { useEffect, useRef, useState } from 'react'

interface TypewriterOptions {
  roles: string[]
  typingSpeed?: number
  deletingSpeed?: number
  pauseDuration?: number
}

function useRoleSwitcher({
  roles,
  typingSpeed = 80,
  deletingSpeed = 45,
  pauseDuration = 1600,
}: TypewriterOptions): string {
  const [roleIndex, setRoleIndex] = useState(0)
  const [charIndex, setCharIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)

  // Keep a ref to the latest roles so effects don't go stale
  const rolesRef = useRef(roles)
  useEffect(() => {
    rolesRef.current = roles
  })

  // Reset when roles change (e.g. locale switch)
  const rolesKey = roles.join('\0')
  const prevRolesKey = useRef(rolesKey)
  if (prevRolesKey.current !== rolesKey) {
    prevRolesKey.current = rolesKey
    setRoleIndex(0)
    setCharIndex(0)
    setIsDeleting(false)
  }

  useEffect(() => {
    const current = rolesRef.current[roleIndex] ?? ''

    // Still typing
    if (!isDeleting && charIndex < current.length) {
      const id = setTimeout(() => setCharIndex((c) => c + 1), typingSpeed)
      return () => clearTimeout(id)
    }

    // Finished typing — pause then start deleting
    if (!isDeleting && charIndex === current.length) {
      const id = setTimeout(() => setIsDeleting(true), pauseDuration)
      return () => clearTimeout(id)
    }

    // Still deleting
    if (isDeleting && charIndex > 0) {
      const id = setTimeout(() => setCharIndex((c) => c - 1), deletingSpeed)
      return () => clearTimeout(id)
    }

    // Finished deleting — advance to next role
    if (isDeleting && charIndex === 0) {
      setIsDeleting(false)
      setRoleIndex((i) => (i + 1) % rolesRef.current.length)
    }
  }, [charIndex, isDeleting, roleIndex, typingSpeed, deletingSpeed, pauseDuration])

  return (rolesRef.current[roleIndex] ?? '').slice(0, charIndex)
}

export default useRoleSwitcher
