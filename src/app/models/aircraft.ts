interface AircraftSection{
    purpose:string,
    seatsNumber: string[],
    service: string[]
}
export interface Aircraft {
    name:string,
    aiPilotVersion:string,
    ecoClassSection:AircraftSection ,
    buisnessClassSection:AircraftSection ,
    firstClassSection:AircraftSection ,
    cruiserSpeed:number,
    hasQuantumDrive:boolean,
}
