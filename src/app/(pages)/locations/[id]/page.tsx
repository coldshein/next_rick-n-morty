import { CharacterCard } from "@/app/components/CharacterCard";
import { fetchAllCharacters, fetchMultipleCharacters } from "@/app/lib/character/characterSlice";
import { fetchLocationData } from "@/app/lib/location/locationSlice";
import store from "@/app/lib/store";
import { Character } from "@/types/Character";
import { Location } from "@/types/Location";
import Link from "next/link";

const LocationPage = async ({ params }: { params: { id: string } }) => {
  const response = await store.dispatch(fetchLocationData(params.id));
  const location: Location = response.payload as Location; 


  const charactersResponse = await store.dispatch(fetchAllCharacters());
  const characters: Character[] = Array.isArray(charactersResponse.payload) ? charactersResponse.payload : []; 
  console.log(characters);


  const residentsIds = extractResidentsIds(location.residents);
  const residentsResponse = await store.dispatch(fetchMultipleCharacters(residentsIds as unknown as string[]));
  const residents: Character[] = Array.isArray(residentsResponse.payload) ? residentsResponse.payload : [residentsResponse.payload];

  function extractResidentsIds(residents: string[]) {
    return residents.map(residentUrl => {
      const residentId = residentUrl.split('/').pop(); 
      return residentId ? Number(residentId) : null;
    });
  }


  function filterCharactersByOrigin(characters: Character[], locationName: string): Character[] {
    console.log("Filtering characters by origin:", locationName);
    return [...characters].filter(character => {
      console.log("Character origin:", character.origin.name);
      return character.origin.name === locationName;
    });
  }
  const filteredCharacters = filterCharactersByOrigin(characters, location.name);
  console.log("Filtered characters:", filteredCharacters);
  const residentsCount = residents.length;

  return (
    <div>
      <h1 className="text-2xl font-bold">{location.name}</h1>
      <h2 className="text-xl font-bold mb-8">Residents: {residentsCount} {residentsCount === 1 ? 'resident' : 'residents'}</h2>
      <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-8">
        {residents.map((resident: Character) => (
          <li key={resident.id}>
            <Link href={`/characters/${resident.id}`}><CharacterCard character={resident} /></Link>
          </li>
        ))}
      </ul>
      <h2>Was born here:</h2>
      <ul>
        {filteredCharacters.map((character: Character) => (
          <li key={character.id}>
            <Link href={`/characters/${character.id}`}>{character.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default LocationPage;
