import { Type } from "class-transformer";
import { IsBoolean, IsDate, IsString } from "class-validator";

export class RegisterAuthDto {
    @IsString()
    username!: string
    @IsString()
    password!: string
}