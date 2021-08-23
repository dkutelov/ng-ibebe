import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';

import { ImageService } from 'src/app/core/services/image.service';
import { UserService } from './../../../core/services/user.service';
import { CurrentUser } from 'src/app/shared/interfaces/user';
import { usernameValidator } from 'src/app/shared/form-validators/validators';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  userProfile!: CurrentUser | null;
  loading = false;
  isSavingForm = false;
  isEditMode = false;
  form: FormGroup;

  constructor(
    private userService: UserService,
    private imageService: ImageService,
    private formBuilder: FormBuilder,
  ) {
    this.form = this.formBuilder.group({
      username: [
        '',
        [Validators.required, Validators.minLength(8), usernameValidator],
      ],
      email: ['', [Validators.required, Validators.email]],
    });
  }

  ngOnInit(): void {
    this.userService
      .loadUserProfile()
      .pipe(tap(() => (this.userProfile = null)))
      .subscribe({
        next: (profile: CurrentUser) => {
          this.userProfile = profile;
        },
      });
  }

  openEditMode() {
    this.isEditMode = true;
    this.isSavingForm = false;
    this.form.setValue({
      username: this.userProfile!.username || '',
      email: this.userProfile!.email,
    });
  }

  onImagePicked(event: Event) {
    if (!event || !event.target) return;
    const files = (event.target as HTMLInputElement).files;

    if (!files) return;
    this.loading = true;
    const file = files[0];

    this.imageService
      .addImage(file)
      .subscribe((response: { message: string; url: string }) => {
        this.userProfile!.avatar = response.url;
        this.loading = false;
      });
  }

  updateProfile(): void {
    if (this.form.invalid) {
      return;
    }

    const { username, email } = this.form.value;

    this.userProfile!.email = email;
    this.userProfile!.username = username;

    this.isSavingForm = true;
    this.userService.updateProfile(this.userProfile!).subscribe({
      next: (updatedProfile) => {
        this.userProfile = updatedProfile;
        this.form.reset();
        this.isEditMode = false;
        this.isSavingForm = false;
      },
      error: (err) => {
        console.error(err);
      },
    });
  }
}
