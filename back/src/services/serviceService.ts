import ServiceDto from "../dtos/ServiceDto";
import { Service } from "../entities/Service";
import ServiceRepository from "../repositories/ServiceRepository";


export const getServicesService = async () => {
    try {
        const services = await ServiceRepository.find();
        return services
    } catch (error: any) {
        throw new Error(error)
    }
};

// export const getUserByIdService = async () => { };

export const createServiceService = async (serviceData: ServiceDto): Promise<Service> => {
    try {
        const service = await ServiceRepository.create(serviceData);
        const result = await ServiceRepository.save(service);
        return result
    } catch (error: any) {
        throw new Error(error)
    }
};

// export const loginUserService = async () => { };