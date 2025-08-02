import { initialiseNewFields } from '@/api/database'

export async function GET() {
  initialiseNewFields()
}
