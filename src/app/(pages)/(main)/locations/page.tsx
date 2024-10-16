import { fetchAllLocations } from "@/app/lib/location/locationSlice";
import { LocationList } from "@/app/components/LocationList"; 
import { Pagination } from "@/app/components/Pagination";
import store from "@/app/lib/store";
import { Location } from "@/types/Location";
import { ApiResponse } from "@/types/ApiResponse";
import { PayloadAction } from "@reduxjs/toolkit";
import { PageJumper } from "@/app/components/PageJumper";

export const dynamic = 'force-dynamic';

const LocationsPage = async ({ searchParams }: { searchParams: { page?: string } }) => {
  const currentPage = Number(searchParams.page) || 1;
  const response = await store.dispatch(fetchAllLocations({ 
    query: `page=${currentPage}`, 
    noCache: true 
  })) as PayloadAction<ApiResponse<Location>>;

  const locations: Location[] = response.payload.results;
  const info = response.payload.info;
    
  return (
    <div>
      <div className="flex flex-col gap-4 overflow-y-auto">
        <div className="grid grid-cols-[45%_25%_30%] text-white font-medium pb-1 border-b-[1px] border-light-primary dark:border-dark-primary">
          <div className="text-light-primary dark:text-dark-primary font-bold">
            <h4>Location</h4>
          </div>
          <div className="text-light-primary dark:text-dark-primary font-bold hidden md:flex">
            <h4>Type</h4>
          </div>
          <div className="md:flex items-center justify-end text-light-primary dark:text-dark-primary font-bold hidden">
            <h4>Dimension</h4>
          </div>
        </div>
        <LocationList locations={locations} />
      </div>
      <Pagination info={info} currentPage={currentPage} basePath="/locations" />
    </div>
  );
};
  
export default LocationsPage;
