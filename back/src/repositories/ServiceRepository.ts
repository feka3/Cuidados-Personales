import { AppDataSource } from "../config/data-source";
import { Service } from "../entities/Service";

const ServiceRepository = AppDataSource.getRepository(Service);

export default ServiceRepository