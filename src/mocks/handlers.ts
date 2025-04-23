
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
      // Explicitly set content-type to ensure proper JSON handling
      return HttpResponse.json(institution, {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200
      })
    }
    
    return new HttpResponse(null, { 
      status: 404,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }),
]
