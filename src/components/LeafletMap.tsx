import React, { useEffect, useRef } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { DirectoryStructure } from '../types';

interface LeafletMapProps {
  associations: DirectoryStructure[];
  selectedAssociation: DirectoryStructure | null;
  onSelectAssociation: (assoc: DirectoryStructure | null) => void;
  onOpenFullSheet: (assoc: DirectoryStructure) => void;
}

export const LeafletMap: React.FC<LeafletMapProps> = ({
  associations,
  selectedAssociation,
  onSelectAssociation,
  onOpenFullSheet,
}) => {
  const mapRef = useRef<HTMLDivElement | null>(null);
  const leafletMap = useRef<L.Map | null>(null);
  const markersRef = useRef<{ [id: string]: L.Marker }>({});

  useEffect(() => {
    if (!mapRef.current) return;

    if (!leafletMap.current) {
      // Initialize Leaflet map centered on Paris 18e Goutte d'Or
      const map = L.map(mapRef.current, {
        center: [48.8872, 2.3538],
        zoom: 16,
        zoomControl: true,
      });

      // Add OpenStreetMap Tile Layer
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        maxZoom: 19,
      }).addTo(map);

      // Click on empty map area closes selected card
      map.on('click', () => {
        onSelectAssociation(null);
      });

      leafletMap.current = map;
    }

    return () => {
      // Keep map instance alive across rerenders
    };
  }, []);

  // Update Markers when associations or selection changes
  useEffect(() => {
    const map = leafletMap.current;
    if (!map) return;

    // Clear existing markers
    Object.values(markersRef.current).forEach((marker) => marker.remove());
    markersRef.current = {};

    associations.forEach((assoc) => {
      // Determine lat/lng or fallback to Goutte d'Or coordinates
      const lat = assoc.lat || 48.8872;
      const lng = assoc.lng || 2.3538;

      const isSelected = selectedAssociation?.id === assoc.id;

      // Custom div icon styled matching Goutte d'Or terracotta design
      const customIcon = L.divIcon({
        className: 'custom-leaflet-pin',
        html: `
          <div class="flex flex-col items-center group cursor-pointer">
            <div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full shadow-lg border-2 text-xs font-bold transition-all ${
              isSelected
                ? 'bg-[#4A1E0E] text-white border-white scale-110 ring-4 ring-[#DF6847]/40'
                : 'bg-[#FAF7EE] text-[#4A1E0E] border-[#DF6847] hover:bg-[#DF6847] hover:text-white'
            }">
              <span>🏢</span>
              <span class="whitespace-nowrap max-w-[140px] truncate">${assoc.name}</span>
            </div>
            <div class="w-2.5 h-2.5 bg-[#DF6847] rotate-45 -mt-1 shadow-xs"></div>
          </div>
        `,
        iconSize: [160, 42],
        iconAnchor: [80, 42],
      });

      const marker = L.marker([lat, lng], { icon: customIcon }).addTo(map);

      marker.on('click', (e) => {
        L.DomEvent.stopPropagation(e);
        onSelectAssociation(assoc);
      });

      markersRef.current[assoc.id] = marker;
    });
  }, [associations, selectedAssociation]);

  // Pan to selected association when selected
  useEffect(() => {
    if (selectedAssociation && leafletMap.current) {
      const lat = selectedAssociation.lat || 48.8872;
      const lng = selectedAssociation.lng || 2.3538;
      leafletMap.current.panTo([lat, lng], { animate: true });
    }
  }, [selectedAssociation]);

  return (
    <div className="relative w-full h-[540px] rounded-3xl overflow-hidden border-2 border-[#DF6847] shadow-lg">
      <div ref={mapRef} className="w-full h-full z-10" />

      {/* FLOATING CARD ON MAP WITH CLICK OUTSIDE CLOSING */}
      {selectedAssociation && (
        <div
          className="absolute inset-0 z-20 bg-black/40 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-150"
          onClick={() => onSelectAssociation(null)} // Click outside closes card!
        >
          <div
            className="relative w-full max-w-sm bg-[#FAF7EE] rounded-3xl p-5 sm:p-6 shadow-2xl border-4 border-white animate-in zoom-in-95 duration-200"
            onClick={(e) => e.stopPropagation()} // Prevent click inside card from closing it
          >
            <button
              onClick={() => onSelectAssociation(null)}
              className="absolute top-4 right-4 w-7 h-7 rounded-full bg-[#EFE8D6] hover:bg-[#E2D8C0] flex items-center justify-center text-[#4A1E0E] cursor-pointer"
            >
              ✕
            </button>

            <div className="w-12 h-12 rounded-2xl bg-[#DF6847]/15 flex items-center justify-center mb-3 text-2xl">
              🏢
            </div>

            <h3 className="font-serif text-xl sm:text-2xl font-black text-[#4A1E0E] leading-tight">
              {selectedAssociation.name}
            </h3>
            <p className="text-xs text-[#786E5D] font-medium mt-1">
              📍 {selectedAssociation.address}
            </p>

            <div className="mt-4 space-y-2 text-xs text-[#3D352E]">
              <div>
                <span className="font-bold text-[#4A1E0E] block">Public cible :</span>
                <span className="text-[#63574A]">{selectedAssociation.publicCible}</span>
              </div>
              <div>
                <span className="font-bold text-[#4A1E0E] block">Horaires :</span>
                <span className="text-[#63574A]">{selectedAssociation.horaires}</span>
              </div>
              <div>
                <span className="font-bold text-[#4A1E0E] block">Contact :</span>
                <span className="text-[#63574A] block">{selectedAssociation.phone}</span>
                <span className="text-[#63574A] block">{selectedAssociation.email}</span>
              </div>
            </div>

            <div className="mt-5 flex justify-end">
              <button
                onClick={() => {
                  onOpenFullSheet(selectedAssociation);
                  onSelectAssociation(null);
                }}
                className="px-4 py-2 bg-[#DF6847] hover:bg-[#C94F30] text-white font-bold text-xs rounded-xl shadow-md cursor-pointer flex items-center gap-1"
              >
                <span>Fiche complète</span>
                <span>→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
