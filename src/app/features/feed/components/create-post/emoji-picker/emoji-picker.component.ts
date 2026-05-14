import { Component, EventEmitter, Output, signal } from '@angular/core';
export interface EmojiCategory {
  label: string;
  icon: string;
  emojis: string[];
}
@Component({
  selector: 'app-emoji-picker',
  imports: [],
  templateUrl: './emoji-picker.component.html',
  styleUrl: './emoji-picker.component.css',
})
export class EmojiPickerComponent {
  @Output() emojiSelected = new EventEmitter<string>();

  searchQuery = signal('');

  categories: EmojiCategory[] = [
    {
      label: 'Frequently Used',
      icon: '🕐',
      emojis: ['👍','❤️','😂','🔥','🎉','🙏','😍','💯','😭','🥰','😎','🤔'],
    },
    {
      label: 'Smileys & People',
      icon: '😀',
      emojis: [
        '😀','😃','😄','😁','😆','😅','😂','🤣','😊','😇','🙂','🙃',
        '😉','😌','😍','🥰','😘','😗','😙','😚','😋','😛','😝','😜',
        '🤪','🤨','🧐','🤓','😎','🤩','🥳','😏','😒','😞','😔','😟',
        '😕','🙁','☹️','😣','😖','😫','😩','🥺','😢','😭','😤','😠',
        '😡','🤬','🤯','😳','🥵','🥶','😱','😨','😰','😥','😓','🤗',
        '🤔','🤭','🤫','🤥','😶','😐','😑','😬','🙄','😯','😦','😧',
      ],
    },
    {
      label: 'Nature',
      icon: '🌿',
      emojis: [
        '🐶','🐱','🐭','🐹','🐰','🦊','🐻','🐼','🐨','🐯','🦁','🐮',
        '🐷','🐸','🐵','🐔','🐧','🐦','🦆','🦅','🦉','🦇','🐺','🐗',
        '🌸','🌺','🌻','🌹','🍀','🌿','🌱','🌲','🌳','🌴','🌵','🎋',
      ],
    },
    {
      label: 'Food',
      icon: '🍔',
      emojis: [
        '🍎','🍊','🍋','🍇','🍓','🍒','🍑','🥭','🍍','🥥','🍕','🍔',
        '🍟','🌭','🍿','🧂','🥓','🥚','🍳','🧇','🥞','🧈','🍞','🥐',
        '☕','🍵','🧃','🥤','🍺','🍻','🥂','🍷','🍸','🍹','🧊','🍰',
      ],
    },
    {
      label: 'Activities',
      icon: '⚽',
      emojis: [
        '⚽','🏀','🏈','⚾','🎾','🏐','🏉','🎱','🏓','🏸','🥊','🥋',
        '🎯','🎳','🏹','🎣','🤿','🎽','🎿','🛷','🥌','🎮','🕹️','🎲',
        '🎭','🎨','🎬','🎤','🎧','🎵','🎶','🎸','🎹','🎺','🎻','🥁',
      ],
    },
    {
      label: 'Travel',
      icon: '✈️',
      emojis: [
        '🚗','🚕','🚙','🚌','🚎','🏎️','🚓','🚑','🚒','🚐','🛻','🚚',
        '✈️','🚀','🛸','🚁','⛵','🚢','🛳️','🚂','🚆','🚇','🚊','🚉',
        '🌍','🌎','🌏','🗺️','🗼','🗽','🏰','🏯','🏟️','🎡','🎢','🎠',
      ],
    },
    {
      label: 'Objects',
      icon: '💡',
      emojis: [
        '💡','🔦','🕯️','🪔','📱','💻','🖥️','🖨️','⌨️','🖱️','📷','📸',
        '📹','🎥','📞','☎️','📟','📠','📺','📻','🧭','⏰','⌚','💰',
        '💳','💎','🔑','🗝️','🔒','🔓','🔨','⚒️','🛠️','⚙️','🔧','🔩',
      ],
    },
    {
      label: 'Symbols',
      icon: '❤️',
      emojis: [
        '❤️','🧡','💛','💚','💙','💜','🖤','🤍','🤎','💔','❣️','💕',
        '💞','💓','💗','💖','💘','💝','💟','☮️','✝️','☪️','🕉️','☸️',
        '✨','⭐','🌟','💫','⚡','🔥','🌈','☀️','🌤️','⛅','🌧️','❄️',
      ],
    },
  ];

  activeCategory = signal(0);

  get filteredEmojis(): string[] {
    const q = this.searchQuery().toLowerCase().trim();
    if (!q) return [];
    // simple filter across all emojis
    return this.categories.flatMap(c => c.emojis).filter((_, i) => i < 50);
  }

  get displayCategories(): EmojiCategory[] {
    const q = this.searchQuery().trim();
    if (q) {
      return [{
        label: 'Search Results',
        icon: '🔍',
        emojis: this.categories.flatMap(c => c.emojis).slice(0, 50),
      }];
    }
    return this.categories;
  }

  selectEmoji(emoji: string): void {
    this.emojiSelected.emit(emoji);
  }

  setCategory(index: number): void {
    this.activeCategory.set(index);
  }
}
