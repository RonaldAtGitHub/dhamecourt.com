import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  beforeEach(async () => {
    localStorage.removeItem('dhamecourt-theme');
    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it('should render the positioning headline in an h1', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('h1')?.textContent).toContain(
      'Engineering software'
    );
  });

  it('should default to the sunset background mode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    expect(fixture.componentInstance.theme()).toBe('sunset');
    expect(fixture.nativeElement.classList).toContain('theme-sunset');
  });

  it('should switch and persist the background mode', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const dayButton = fixture.nativeElement.querySelector(
      'button[aria-label="Day mode"]'
    ) as HTMLButtonElement;
    dayButton.click();
    fixture.detectChanges();
    expect(fixture.componentInstance.theme()).toBe('day');
    expect(fixture.nativeElement.classList).toContain('theme-day');
    expect(localStorage.getItem('dhamecourt-theme')).toBe('day');
  });

  it('should render the highlight cards', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const cards = compiled.querySelectorAll('.card');
    expect(cards.length).toBe(fixture.componentInstance.highlights.length);
  });

  it('should render CV download links', () => {
    const fixture = TestBed.createComponent(AppComponent);
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const downloadLinks = compiled.querySelectorAll('a[download]');
    expect(downloadLinks.length).toBeGreaterThan(0);
    downloadLinks.forEach((link) => {
      expect(link.getAttribute('href')).toBe('assets/resume.pdf');
    });
  });
});
