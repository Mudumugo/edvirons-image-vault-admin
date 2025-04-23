
import { http, HttpResponse } from 'msw';

// Initialize mock registry with some sample institutions
let mockRegistry: Record<string, any> = {
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
  "MOE789012": {
    name: "Nakuru Day Secondary",
    country: "KE",
    region: "Nakuru",
    level: "High School",
    curriculum: "CBC",
  },
  "MOE654321": {
    name: "Eldoret Polytechnic",
    country: "KE",
    region: "Uasin Gishu",
    level: "TVET",
    curriculum: "CDACC",
  },
};

export const handlers = [
  // Get a specific institution by ID
  http.get('/api/institution/:regId', ({ params }) => {
    const { regId } = params;
    const institution = mockRegistry[regId as string];

    if (institution) {
      return HttpResponse.json({ 
        id: regId, 
        ...institution 
      });
    }
    
    return HttpResponse.json({ error: "Institution not found" }, { status: 404 });
  }),

  // Get all institutions
  http.get('/api/institution', () => {
    const institutions = Object.entries(mockRegistry).map(([id, details]) => ({
      id,
      ...details
    }));
    
    return HttpResponse.json(institutions);
  }),
  
  // Create a new institution
  http.post('/api/institution', async ({ request }) => {
    const institution = await request.json();
    
    if (!institution.id || !institution.name) {
      return HttpResponse.json(
        { error: "Institution ID and name are required" },
        { status: 400 }
      );
    }
    
    if (mockRegistry[institution.id]) {
      return HttpResponse.json(
        { error: "Institution with this ID already exists" },
        { status: 409 }
      );
    }
    
    const { id, ...institutionData } = institution;
    mockRegistry[id] = institutionData;
    
    return HttpResponse.json({ 
      id,
      ...institutionData 
    }, { status: 201 });
  }),
  
  // Update an institution
  http.put('/api/institution/:regId', async ({ params, request }) => {
    const { regId } = params;
    const updatedData = await request.json();
    
    if (!mockRegistry[regId as string]) {
      return HttpResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }
    
    const { id, ...institutionData } = updatedData;
    mockRegistry[regId as string] = institutionData;
    
    return HttpResponse.json({ 
      id: regId,
      ...institutionData 
    });
  }),
  
  // Delete an institution
  http.delete('/api/institution/:regId', ({ params }) => {
    const { regId } = params;
    
    if (!mockRegistry[regId as string]) {
      return HttpResponse.json(
        { error: "Institution not found" },
        { status: 404 }
      );
    }
    
    delete mockRegistry[regId as string];
    
    return HttpResponse.json({ 
      message: "Institution deleted successfully" 
    });
  }),
];
