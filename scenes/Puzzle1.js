class Puzzle1 extends Phaser.Scene {
  constructor() {
    super("Puzzle1");
    this.pieces = [];
    this.slots = [];
    this.currentStep = 0;
  }

  create() {
    this.cameras.main.setBackgroundColor("rgba(0,0,0,0)");
    this.createAnimatedBackground();
    this.createBoard();
    this.createCircuitBase();
    this.createSlots();
    this.createPieces();
    this.createGuideHand();
    this.highlightCurrentSlot();
  }

  createAnimatedBackground() {
    const g = this.add.graphics().setDepth(-20);
    g.fillGradientStyle(0x0f2b46, 0x1d3557, 0x1b4332, 0x0a1128, 1);
    g.fillRect(0, 0, 1000, 500);
    this.bgDots = [];
    for (let i = 0; i < 40; i += 1) {
      const dot = this.add.circle(
        Phaser.Math.Between(0, 1000),
        Phaser.Math.Between(0, 500),
        Phaser.Math.Between(2, 5),
        Phaser.Utils.Array.GetRandom([0x38bdf8, 0x60a5fa, 0x34d399, 0xfbbf24]),
        Phaser.Math.FloatBetween(0.2, 0.45),
      );
      dot.setDepth(-19);
      this.bgDots.push(dot);
      this.tweens.add({
        targets: dot,
        y: dot.y - Phaser.Math.Between(60, 140),
        alpha: 0.05,
        duration: Phaser.Math.Between(2200, 3600),
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
    }
  }

  createBoard() {
    const shadow = this.add.graphics();
    shadow.fillStyle(0x000000, 0.2);
    shadow.fillRoundedRect(54, 45, 900, 420, 30);

    const wood = this.add.graphics();
    wood.fillStyle(0xcfa87f, 1);
    wood.fillRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(6, 0x8f6a46, 1);
    wood.strokeRoundedRect(45, 35, 910, 430, 28);
    wood.lineStyle(2, 0xe8c39e, 0.35);
    for (let y = 58; y <= 432; y += 26) {
      wood.strokeLineShape(new Phaser.Geom.Line(70, y, 930, y + Phaser.Math.Between(-3, 3)));
    }

    const board = this.add.graphics();
    board.fillStyle(0x1f6f4a, 1);
    board.fillRoundedRect(95, 70, 810, 360, 22);
    board.lineStyle(3, 0x2f8d5f, 0.95);
    board.strokeRoundedRect(95, 70, 810, 360, 22);
    board.fillGradientStyle(0xffffff, 0xffffff, 0xffffff, 0xffffff, 0.05);
    board.fillRoundedRect(110, 85, 780, 140, 14);

    for (let x = 120; x < 880; x += 26) {
      for (let y = 96; y < 404; y += 24) {
        board.fillStyle(0x114b33, 0.9);
        board.fillCircle(x, y, 2);
      }
    }
  }

  createCircuitBase() {
    const g = this.add.graphics();

    g.fillStyle(0x2f3640, 1);
    g.fillRoundedRect(120, 184, 100, 132, 12);
    g.fillStyle(0xe84118, 1);
    g.fillRoundedRect(120, 184, 100, 34, 12);
    g.fillStyle(0xffffff, 0.18);
    g.fillRoundedRect(126, 190, 88, 8, 4);
    g.fillStyle(0xced6e0, 1);
    g.fillRoundedRect(150, 170, 36, 14, 4);
    g.fillRoundedRect(150, 316, 36, 14, 4);
    g.fillStyle(0xff6b6b, 1);
    g.fillCircle(170, 168, 8);
    g.fillStyle(0x1e272e, 1);
    g.fillCircle(170, 334, 8);

    g.fillStyle(0xb87333, 1);
    g.fillRoundedRect(362, 132, 72, 30, 8);
    g.fillRoundedRect(362, 332, 72, 30, 8);
    g.fillStyle(0xf5f6fa, 1);
    g.fillRoundedRect(368, 142, 60, 10, 4);
    g.fillRoundedRect(368, 342, 60, 10, 4);
    g.fillStyle(0xe1b12c, 1);
    g.fillRect(380, 141, 6, 12);
    g.fillStyle(0xc23616, 1);
    g.fillRect(395, 141, 6, 12);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(410, 141, 6, 12);
    g.fillStyle(0x44bd32, 1);
    g.fillRect(380, 341, 6, 12);
    g.fillStyle(0x273c75, 1);
    g.fillRect(395, 341, 6, 12);
    g.fillStyle(0x2f3640, 1);
    g.fillRect(410, 341, 6, 12);

    this.topBulb = this.createBulb(840, 150);
    this.bottomBulb = this.createBulb(840, 350);

    g.lineStyle(8, 0xfb923c, 0.96);
    g.strokeLineShape(new Phaser.Geom.Line(170, 170, 320, 170));
    g.strokeLineShape(new Phaser.Geom.Line(170, 330, 320, 330));
    g.strokeLineShape(new Phaser.Geom.Line(800, 150, 840, 150));
    g.strokeLineShape(new Phaser.Geom.Line(800, 350, 840, 350));

    g.lineStyle(3, 0xffffff, 0.32);
    g.strokeLineShape(new Phaser.Geom.Line(170, 176, 320, 176));
    g.strokeLineShape(new Phaser.Geom.Line(170, 336, 320, 336));
    g.strokeLineShape(new Phaser.Geom.Line(800, 156, 840, 156));
    g.strokeLineShape(new Phaser.Geom.Line(800, 356, 840, 356));
    g.lineStyle(8, 0x38bdf8, 0.9);
    g.strokeLineShape(new Phaser.Geom.Line(320, 170, 320, 330));
    g.strokeLineShape(new Phaser.Geom.Line(800, 150, 800, 350));
    g.lineStyle(3, 0xffffff, 0.3);
    g.strokeLineShape(new Phaser.Geom.Line(324, 170, 324, 330));
    g.strokeLineShape(new Phaser.Geom.Line(804, 150, 804, 350));
  }

  createBulb(x, y) {
    const bulb = this.add.container(x, y);
    const glow = this.add.circle(0, 0, 34, 0xfff3b0, 0.12);
    const g = this.add.graphics();
    g.fillStyle(0xffffff, 0.8);
    g.fillCircle(0, 0, 24);
    g.lineStyle(2, 0xc8d6e5, 1);
    g.strokeCircle(0, 0, 24);
    g.fillStyle(0xfff3b0, 0.45);
    g.fillCircle(0, 2, 14);
    g.fillStyle(0xffffff, 0.45);
    g.fillEllipse(-6, -9, 10, 7);
    g.fillStyle(0x6b7785, 1);
    g.fillRoundedRect(-12, 20, 24, 14, 5);
    g.fillStyle(0x95a5a6, 1);
    g.fillRoundedRect(-12, 33, 24, 8, 4);
    bulb.add([glow, g]);
    return bulb;
  }

  createSlots() {
    this.slots = [
      this.createSlot(320, 250, 24, 220),
      this.createSlot(560, 150, 280, 22),
      this.createSlot(560, 350, 280, 22),
      this.createSlot(800, 250, 24, 220),
    ];
  }

  createSlot(x, y, w, h) {
    const zone = this.add.zone(x, y, w + 30, h + 30);
    zone.setRectangleDropZone(w + 30, h + 30);
    zone.realWidth = w;
    zone.realHeight = h;
    zone.filled = false;

    const g = this.add.graphics();
    g.fillStyle(0x8c7a57, 0.26);
    g.fillRoundedRect(x - w / 2, y - h / 2, w, h, 8);
    g.lineStyle(3, 0xfbc531, 0.4);
    g.strokeRoundedRect(x - w / 2, y - h / 2, w, h, 8);
    zone.visual = g;
    return zone;
  }

  createPieces() {
    const startY = 430;
    const positions = [250, 430, 610, 790];
    const sizes = [
      { w: 24, h: 220 },
      { w: 280, h: 22 },
      { w: 280, h: 22 },
      { w: 24, h: 220 },
    ];

    for (let i = 0; i < 4; i += 1) {
      const piece = this.createPiece(
        positions[i],
        startY,
        sizes[i].w,
        sizes[i].h,
        i,
      );
      piece.slotIndex = i;
      piece.homeX = positions[i];
      piece.homeY = startY;
      this.pieces.push(piece);
      this.enableDrag(piece);
    }
  }

  createPiece(x, y, w, h, slotIndex) {
    const colors = [0xd32f2f, 0xef6c00, 0x1e88e5, 0x2e7d32];
    const sleeve = colors[slotIndex] || 0x2c3e50;
    const container = this.add.container(x, y);
    const shadow = this.add.ellipse(0, h > w ? h / 2 + 10 : 18, w > h ? w * 0.75 : 32, 12, 0x000000, 0.2);
    const g = this.add.graphics();
    g.fillStyle(0x101418, 1);
    g.fillRoundedRect(-w / 2 - 2, -h / 2 - 2, w + 4, h + 4, 9);
    g.fillStyle(sleeve, 1);
    g.fillRoundedRect(-w / 2, -h / 2, w, h, 8);
    g.lineStyle(2, 0xffffff, 0.3);
    g.strokeRoundedRect(-w / 2 + 1, -h / 2 + 1, w - 2, h - 2, 8);
    g.fillStyle(0xdfe6e9, 1);
    if (w > h) {
      g.fillRoundedRect(-w / 2 - 12, -8, 12, 16, 4);
      g.fillRoundedRect(w / 2, -8, 12, 16, 4);
    } else {
      g.fillRoundedRect(-8, -h / 2 - 12, 16, 12, 4);
      g.fillRoundedRect(-8, h / 2, 16, 12, 4);
    }
    container.add([shadow, g]);
    container.dragShadow = shadow;
    container.shadowBaseY = shadow.y;
    container.shadowBaseAlpha = 0.2;
    container.setSize(w + 30, h + 30);
    container.setInteractive({ cursor: "grab" });
    return container;
  }

  enableDrag(piece) {
    this.input.setDraggable(piece);
    piece.on("pointerdown", () => {
      piece.setDepth(20);
      piece.scale = 1.03;
      piece.prevX = piece.x;
      piece.prevY = piece.y;
      if (piece.dragShadow) {
        piece.dragShadow.alpha = 0.34;
        piece.dragShadow.scaleX = 1.08;
        piece.dragShadow.scaleY = 1.08;
      }
    });

    piece.on("pointerup", () => {
      piece.scale = 1;
      this.resetDragShadow(piece);
    });

    this.input.on("drag", (_, gameObject, dragX, dragY) => {
      if (gameObject !== piece || piece.locked) {
        return;
      }
      const dx = dragX - (gameObject.prevX || dragX);
      const dy = dragY - (gameObject.prevY || dragY);
      gameObject.prevX = dragX;
      gameObject.prevY = dragY;
      if (gameObject.dragShadow) {
        gameObject.dragShadow.x = Phaser.Math.Clamp(-dx * 0.1, -14, 14);
        gameObject.dragShadow.y =
          gameObject.shadowBaseY + Phaser.Math.Clamp(-dy * 0.08, -6, 10);
      }
      gameObject.x = dragX;
      gameObject.y = dragY;
    });

    this.input.on("dragend", (_, gameObject) => {
      if (gameObject !== piece || piece.locked) {
        return;
      }
      this.resetDragShadow(gameObject);
      this.tryPlacePiece(gameObject);
    });
  }

  resetDragShadow(piece) {
    if (!piece.dragShadow) {
      return;
    }
    piece.dragShadow.x = 0;
    piece.dragShadow.y = piece.shadowBaseY;
    piece.dragShadow.scaleX = 1;
    piece.dragShadow.scaleY = 1;
    piece.dragShadow.alpha = piece.shadowBaseAlpha;
  }

  tryPlacePiece(piece) {
    const slot = this.slots[piece.slotIndex];
    const isRightStep = piece.slotIndex === this.currentStep;
    const nearSlot =
      Phaser.Math.Distance.Between(piece.x, piece.y, slot.x, slot.y) < 90;

    if (isRightStep && nearSlot && !slot.filled) {
      slot.filled = true;
      piece.locked = true;
      piece.disableInteractive();
      this.tweens.add({
        targets: piece,
        x: slot.x,
        y: slot.y,
        scale: 1,
        duration: 220,
        ease: "Back.out",
      });
      this.currentStep += 1;
      this.highlightCurrentSlot();
      if (this.currentStep === this.slots.length) {
        this.completePuzzle();
      }
      return;
    }

    this.tweens.add({
      targets: piece,
      x: piece.homeX,
      y: piece.homeY,
      duration: 220,
      ease: "Sine.out",
    });
  }

  createGuideHand() {
    this.guide = this.add.text(0, 0, "👆🏻", { fontSize: "48px" }).setDepth(50);
  }

  highlightCurrentSlot() {
    if (this.guideTween) {
      this.guideTween.stop();
    }
    if (this.guidePulseTween) {
      this.guidePulseTween.stop();
    }
    for (let i = 0; i < this.slots.length; i += 1) {
      this.slots[i].visual.clear();
      this.slots[i].visual.fillStyle(0x8c7a57, 0.26);
      this.slots[i].visual.fillRoundedRect(
        this.slots[i].x - this.slots[i].realWidth / 2,
        this.slots[i].y - this.slots[i].realHeight / 2,
        this.slots[i].realWidth,
        this.slots[i].realHeight,
        8,
      );
      this.slots[i].visual.lineStyle(
        3,
        i === this.currentStep ? 0xfbc531 : 0x7f8c8d,
        i === this.currentStep ? 1 : 0.45,
      );
      this.slots[i].visual.strokeRoundedRect(
        this.slots[i].x - this.slots[i].realWidth / 2,
        this.slots[i].y - this.slots[i].realHeight / 2,
        this.slots[i].realWidth,
        this.slots[i].realHeight,
        8,
      );
    }

    const target = this.slots[this.currentStep];
    const source = this.pieces.find(
      (piece) => piece.slotIndex === this.currentStep && !piece.locked,
    );
    if (target) {
      const sourceX = source ? source.x : target.x - 90;
      const sourceY = source ? source.y - 35 : target.y - 35;
      const targetX = target.x - 15;
      const targetY = target.y - target.realHeight / 2 - 45;

      this.guide.setPosition(sourceX, sourceY);
      this.guideTween = this.tweens.add({
        targets: this.guide,
        x: targetX,
        y: targetY,
        duration: 900,
        yoyo: true,
        repeat: -1,
        ease: "Sine.inOut",
      });
      if (source) {
        this.guidePulseTween = this.tweens.add({
          targets: source,
          scale: { from: 1, to: 1.08 },
          duration: 450,
          yoyo: true,
          repeat: -1,
        });
      }
    } else {
      this.guide.setVisible(false);
    }
  }

  completePuzzle() {
    this.tweens.add({
      targets: [this.topBulb, this.bottomBulb],
      scale: { from: 1, to: 1.08 },
      duration: 300,
      yoyo: true,
      repeat: 4,
    });

    this.sparkBulb(this.topBulb);
    this.sparkBulb(this.bottomBulb);
    this.launchConfetti();

    this.time.delayedCall(2500, () => {
      this.scene.start("Puzzle2");
    });
  }

  sparkBulb(targetBulb) {
    for (let i = 0; i < 18; i += 1) {
      const a = (Math.PI * 2 * i) / 18;
      const dot = this.add.circle(targetBulb.x, targetBulb.y, 4, 0xfff176, 0.9);
      this.tweens.add({
        targets: dot,
        x: targetBulb.x + Math.cos(a) * 46,
        y: targetBulb.y + Math.sin(a) * 46,
        alpha: 0,
        duration: 520,
        ease: "Cubic.out",
        onComplete: () => dot.destroy(),
      });
    }
  }

  launchConfetti() {
    const colors = [0xff6b6b, 0xfeca57, 0x1dd1a1, 0x54a0ff, 0xff9ff3];
    for (let i = 0; i < 90; i += 1) {
      const x = Phaser.Math.Between(100, 900);
      const y = Phaser.Math.Between(-30, 100);
      const size = Phaser.Math.Between(4, 9);
      const confetti = this.add.rectangle(
        x,
        y,
        size,
        size * 1.8,
        Phaser.Utils.Array.GetRandom(colors),
      );
      confetti.rotation = Phaser.Math.FloatBetween(0, Math.PI);
      this.tweens.add({
        targets: confetti,
        x: x + Phaser.Math.Between(-120, 120),
        y: y + Phaser.Math.Between(260, 520),
        rotation: confetti.rotation + Phaser.Math.FloatBetween(2, 7),
        alpha: 0,
        duration: Phaser.Math.Between(1000, 1700),
        ease: "Quad.in",
        onComplete: () => confetti.destroy(),
      });
    }
  }
}
