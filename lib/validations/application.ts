import { z } from 'zod'

export const applicationSchema = z.object({
  name: z.string().min(2, 'Ad Soyad en az 2 karakter olmalı'),
  email: z.string().email('Geçerli bir e-posta girin'),
  company: z.string().optional(),
  phone: z.string().optional(),
  service: z.string().optional(),
  message: z.string().optional()
})

export type ApplicationInput = z.infer<typeof applicationSchema>
