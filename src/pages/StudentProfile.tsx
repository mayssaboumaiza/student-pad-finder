// src/pages/proprietaire/StudentProfile.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, MapPin, GraduationCap, Building2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

const StudentProfile = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const student = {
    name: 'Foulen El Fouleni',
    avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Foulen',
    bio: "Étudiant en informatique, je recherche un logement calme à proximité de la fac.",
    age: 21,
    location: 'Gabès',
    education: 'Licence 3',
    university: 'FST',
    colocataire: 'Foulena El Foulenia',
    rentalHistory: [
      {
        id: '1',
        name: 'Takatea Homestay',
        address: '3 Street Peligi 10, 77 Pkw011',
        period: 'Oct 2023 - Jan 2024',
        image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=400',
        isOwner: true,
      }
    ]
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-card border-b px-6 py-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-secondary rounded-lg">
          <ArrowLeft className="w-5 h-5" />
        </button>
      </div>

      {/* Profile Info */}
      <div className="p-6">
        <div className="flex flex-col items-center text-center mb-6">
          <img
            src={student.avatar}
            alt={student.name}
            className="w-24 h-24 rounded-full mb-4 border-4 border-background shadow-lg"
          />
          <h1 className="text-2xl font-bold mb-2">{student.name}</h1>
          <p className="text-sm text-muted-foreground max-w-xs">
            {student.bio}
          </p>
        </div>

        {/* Info Cards */}
        <div className="space-y-3 mb-6">
          <div className="flex items-center gap-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <span className="text-xl">🎂</span>
            </div>
            <span className="font-medium">{student.age} ans</span>
          </div>

          <div className="flex items-center gap-3 bg-pink-50 dark:bg-pink-900/20 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <MapPin className="w-5 h-5 text-pink-600" />
            </div>
            <span className="font-medium">{student.location}</span>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <GraduationCap className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">{student.education}</span>
          </div>

          <div className="flex items-center gap-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg px-4 py-3">
            <div className="w-10 h-10 bg-white dark:bg-gray-800 rounded-lg flex items-center justify-center">
              <Building2 className="w-5 h-5 text-blue-600" />
            </div>
            <span className="font-medium">{student.university}</span>
          </div>
        </div>

        {/* Colocataire */}
        <div className="mb-6">
          <p className="text-sm text-muted-foreground mb-2">
            A un colocataire : <span className="font-semibold text-primary">{student.colocataire}</span>
          </p>
        </div>

        {/* Historique de location */}
        <div>
          <h2 className="text-lg font-semibold mb-4">Historique de location</h2>
          {student.rentalHistory.map((rental) => (
            <div key={rental.id} className="bg-card rounded-xl overflow-hidden border shadow-sm">
              <img
                src={rental.image}
                alt={rental.name}
                className="w-full h-32 object-cover"
              />
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold">{rental.name}</h3>
                    <p className="text-xs text-muted-foreground">{rental.address}</p>
                  </div>
                  {rental.isOwner && (
                    <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                      Votre Propriétaire
                    </span>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{rental.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StudentProfile;