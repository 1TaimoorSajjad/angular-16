export class Menu {
    title!: string;
    url!: string;
    icon!: string;
    key!: string;
    position!: number;
    subMenus?: SubMenu[];
    roles!: string[];
}

export class SubMenu {
    title!: string;
    url!: string;
    position!: number;
    roles!: string[];
}
