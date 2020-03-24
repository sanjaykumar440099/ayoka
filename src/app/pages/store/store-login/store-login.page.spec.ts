import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { StoreLoginPage } from './store-login.page';

describe('StoreLoginPage', () => {
  let component: StoreLoginPage;
  let fixture: ComponentFixture<StoreLoginPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StoreLoginPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(StoreLoginPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
