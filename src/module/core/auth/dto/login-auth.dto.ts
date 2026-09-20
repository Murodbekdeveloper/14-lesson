import { IsBoolean, IsString } from "class-validator";

export class LoginAuthDto {
    @IsString()
    username!: string
    @IsString()
    password!: string
    @IsBoolean()
    is_active!: boolean
}