
import { http, HttpResponse } from 'msw'

const mockRegistry = {
  "13426": {
    name: "Kibera High School",
    country: "KE",
    region: "Nairobi",
    level: "High School",
    curriculum: "CBC",
  },
  "KEB010245": {
    name: "Mfangano Technical College",
    country: "KE",
    region: "Homabay",
    level: "TVET",
    curriculum: "CDACC",
  },
}

export const handlers = [
  http.get('/api/institution/:regId', ({ params }) => {
    const { regId } = params
    const institution = mockRegistry[regId as string]

    if (institution) {
      // Return a proper JSON response
      return HttpResponse.json(institution)
    }
    
    return HttpResponse.json({ error: "Institution not found" }, { status: 404 })
  }),
]
