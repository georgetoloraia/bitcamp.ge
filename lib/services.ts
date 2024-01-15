import { services } from "@/config/site"

export const getServiceByMachineName = (machineName) => {
    return services.find((service) => service.machine_name === machineName);
}