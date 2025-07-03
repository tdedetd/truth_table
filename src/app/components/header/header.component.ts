import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'tt-header',
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class HeaderComponent {

}
