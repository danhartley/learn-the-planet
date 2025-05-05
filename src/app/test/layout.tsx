import { ScoreDisplay } from '@/components/ScoreDisplay'

export default function TestLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      {children}
      <ScoreDisplay />
    </>
  )
}
