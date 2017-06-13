
import { Button } from "../services/blue-delta-sdk/index";

export class ButtonModel implements Button {
    buttonId?: string;
    name: string;
    thumb?: string;
    layer?: string;

    constructor(name: string, layer?: string, thumb?: string) {
            this.name       = name;
            this.thumb      = thumb || 'Default Button Thumb';
            this.layer      = layer || 'Default Button Layer';
    }

}
