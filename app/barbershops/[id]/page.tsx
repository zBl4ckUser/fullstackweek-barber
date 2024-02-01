import { db } from "@/app/_lib/prisma";
import { ChevronLeftIcon, MapPinIcon, MenuIcon, StarIcon } from "lucide-react";
import { Button } from "@/app/_components/ui/button";
import Image from "next/image";
import BarbershopInfo from "./_components/barbershop-info";
import ServiceItem from "./_components/service-item";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface BarbershopDetailsPageProps {
    params: {
        id?: string
    }
}

const BarbershopDetailsPage =  async ({params}: BarbershopDetailsPageProps) => {
    const session = await getServerSession(authOptions);

    console.log("Session: " + session)
    
    if (!params.id) {
        //todo: redirecionar para home page
        return null;
    }
    
    const barbershop = await db.barbershop.findUnique({
        where: {
            id: params.id,
        },
        include: {
            services: true,
        }
    });    

    if (!barbershop) {
        //todo: redirecionar para home page
        return null;
    }
    
    return ( 
        <div>
            <BarbershopInfo barbershop={barbershop}/>
            
            <div className="flex flex-col px-5 gap-4 py-6">
                {barbershop.services.map((service: any) => (
                    <ServiceItem key={service.id} service={service} isAuthenticated={!!session?.user}/>
                ))}
            </div>
        </div>
        

    );
}
 
export default BarbershopDetailsPage;