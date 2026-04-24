import { MyConfigService } from "src/config/config.service";
import { RolesService } from "src/modules/usuarios/modules/roles/services/roles.service";
import { EmailService } from "src/shared/services/email/email.service";
export declare class AppTask {
    private readonly rolesService;
    private readonly emailService;
    private readonly myConfigService;
    constructor(rolesService: RolesService, emailService: EmailService, myConfigService: MyConfigService);
    refreshDataBase(): Promise<void>;
}
