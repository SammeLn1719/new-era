import { UseGuards } from "@nestjs/common";
import { JwtAuthGuard } from "../guards/jwt.gaurd";


export const Auth = () => UseGuards(JwtAuthGuard);