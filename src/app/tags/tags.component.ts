import { TagService } from '../tag.service';
import { Tag } from '../model/tag';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent {
  @Input() tagFilters?: Tag[];
  @Output() onTagClicked = new EventEmitter<Tag>();
  @Output() onClearTagsClicked = new EventEmitter<void>();
  tags: Tag[] = [];

  constructor(private tagService: TagService) {
  }

  getTags(): void {
    this.tags = this.tagService.getTags();
  }
  ngOnInit(): void {
    this.getTags();
  }

  handleTagClicked(tag: Tag) {
    this.onTagClicked.emit(tag);
  }

  handleClearTagsClicked() {
    this.onClearTagsClicked.emit();
  }

  isActiveFilter(tag: Tag): boolean {
    return this.tagFilters?.some(t => t.id === tag.id) ?? false;
  }
}
