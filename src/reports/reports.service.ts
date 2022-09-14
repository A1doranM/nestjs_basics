import {Injectable} from "@nestjs/common";
import {CreateReportDto} from "./dtos/create-report.dto";
import {PrismaService} from "../dal/prisma/prisma.service";

@Injectable()
export class ReportsService {
    constructor(private repo: PrismaService) {
    }

    async create(reportDto: CreateReportDto) {
        const newReport = await this.repo.reports.create({
            data: {
                lat: reportDto.lat,
                lng: reportDto.lng,
                make: reportDto.make,
                mileage: reportDto.mileage,
                model: reportDto.model,
                price: reportDto.price,
                year: reportDto.year
            }
        });

        return newReport;
    }
}
