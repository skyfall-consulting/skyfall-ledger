import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  obsidian,
  teal,
  horizon,
  violet,
  mint,
  coral,
  amber,
  sky,
  semantic,
  dataVis,
} from './colors';
import { fontFamily, fontWeight, fontSize, lineHeight, tracking } from './typography';
import { space } from './spacing';
import { radius } from './radius';
import { shadowLight, shadowDark } from './shadows';
import { duration, easing } from './motion';
import { focus } from './focus';

/**
 * Foundations / Tokens
 *
 * Visual reference for every primitive token used by Skyfall Ledger.
 * Use this story to verify that the design language is intact before
 * iterating on components.
 */
const meta: Meta = {
  title: 'Components/Foundations/Tokens',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Skyfall Ledger token reference. Identity: **Obsidian & Lucid Teal** — a dark obsidian neutral spine with a single lucid teal accent for action and signal.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

// ---------- Layout helpers ----------

const Section: React.FC<{ title: string; description?: string; children: React.ReactNode }> = ({
  title,
  description,
  children,
}) => (
  <section
    style={{
      padding: '32px 40px',
      borderBottom: '1px solid var(--ledger-color-border-subtle)',
    }}
  >
    <header style={{ marginBottom: 24 }}>
      <h2
        style={{
          margin: 0,
          fontFamily: fontFamily.display,
          fontSize: fontSize['title-lg'],
          lineHeight: lineHeight['title-lg'],
          fontWeight: fontWeight.semibold,
          letterSpacing: tracking.tight,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        {title}
      </h2>
      {description && (
        <p
          style={{
            margin: '4px 0 0',
            fontFamily: fontFamily.sans,
            fontSize: fontSize['body-md'],
            lineHeight: lineHeight['body-md'],
            color: 'var(--ledger-color-text-secondary)',
            maxWidth: 720,
          }}
        >
          {description}
        </p>
      )}
    </header>
    {children}
  </section>
);

const Grid: React.FC<{ minWidth?: number; gap?: number; children: React.ReactNode }> = ({
  minWidth = 160,
  gap = 16,
  children,
}) => (
  <div
    style={{
      display: 'grid',
      gridTemplateColumns: `repeat(auto-fill, minmax(${minWidth}px, 1fr))`,
      gap,
    }}
  >
    {children}
  </div>
);

// ---------- Color swatches ----------

const Swatch: React.FC<{ name: string; value: string }> = ({ name, value }) => (
  <div
    style={{
      borderRadius: radius.md,
      overflow: 'hidden',
      border: '1px solid var(--ledger-color-border-subtle)',
      background: 'var(--ledger-color-surface-default)',
    }}
  >
    <div style={{ height: 64, background: value }} />
    <div style={{ padding: '10px 12px' }}>
      <div
        style={{
          fontFamily: fontFamily.sans,
          fontSize: fontSize['body-sm'],
          fontWeight: fontWeight.medium,
          color: 'var(--ledger-color-text-primary)',
        }}
      >
        {name}
      </div>
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: fontSize['mono-sm'],
          color: 'var(--ledger-color-text-muted)',
          marginTop: 2,
        }}
      >
        {value}
      </div>
    </div>
  </div>
);

const Scale: React.FC<{ label: string; scale: Record<string | number, string> }> = ({
  label,
  scale,
}) => (
  <div style={{ marginBottom: 24 }}>
    <h3
      style={{
        margin: '0 0 8px',
        fontFamily: fontFamily.sans,
        fontSize: fontSize['body-md'],
        fontWeight: fontWeight.semibold,
        color: 'var(--ledger-color-text-secondary)',
        textTransform: 'uppercase',
        letterSpacing: tracking.label,
      }}
    >
      {label}
    </h3>
    <Grid minWidth={140} gap={12}>
      {Object.entries(scale).map(([key, value]) => (
        <Swatch key={key} name={`${label.toLowerCase()}.${key}`} value={value} />
      ))}
    </Grid>
  </div>
);

export const Colors: Story = {
  render: () => (
    <div>
      <Section
        title="Color"
        description="Obsidian carries the spine. Teal carries the signal. Mint, Coral and Amber are the financial semantic palette. Horizon, Violet and Sky are reserved for data-visualization differentiation."
      >
        <Scale label="Obsidian" scale={obsidian} />
        <Scale label="Teal" scale={teal} />
        <Scale label="Mint" scale={mint} />
        <Scale label="Coral" scale={coral} />
        <Scale label="Amber" scale={amber} />
        <Scale label="Horizon" scale={horizon} />
        <Scale label="Violet" scale={violet} />
        <Scale label="Sky" scale={sky} />
      </Section>

      <Section title="Semantic roles" description="What components actually consume.">
        <Grid minWidth={160}>
          {Object.entries(semantic).map(([name, value]) => (
            <Swatch key={name} name={name} value={value} />
          ))}
        </Grid>
      </Section>

      <Section
        title="Data-visualization palette"
        description="Perceptually ordered, colorblind-checked. Used by every chart series in order."
      >
        <div style={{ display: 'flex', gap: 8, alignItems: 'center', flexWrap: 'wrap' }}>
          {dataVis.map((color, i) => (
            <div key={`${color}-${i}`} style={{ textAlign: 'center' }}>
              <div
                style={{
                  width: 56,
                  height: 56,
                  borderRadius: radius.sm,
                  background: color,
                  border: '1px solid var(--ledger-color-border-subtle)',
                }}
              />
              <div
                style={{
                  marginTop: 6,
                  fontFamily: fontFamily.mono,
                  fontSize: fontSize['mono-sm'],
                  color: 'var(--ledger-color-text-muted)',
                }}
              >
                {i}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  ),
};

// ---------- Typography ----------

export const Typography: Story = {
  render: () => {
    const sizes = Object.keys(fontSize) as (keyof typeof fontSize)[];
    return (
      <Section
        title="Typography"
        description="Inter for UI, Inter Display for hero, JetBrains Mono for codes and timestamps. Money is rendered with tabular lining figures."
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
          {sizes.map((key) => {
            const isMono = key.startsWith('mono');
            const isDisplay = key.startsWith('display');
            return (
              <div
                key={key}
                style={{
                  display: 'grid',
                  gridTemplateColumns: '180px 1fr',
                  gap: 24,
                  alignItems: 'baseline',
                }}
              >
                <div
                  style={{
                    fontFamily: fontFamily.mono,
                    fontSize: fontSize['mono-sm'],
                    color: 'var(--ledger-color-text-muted)',
                  }}
                >
                  {key} · {fontSize[key]}
                </div>
                <div
                  style={{
                    fontFamily: isMono
                      ? fontFamily.mono
                      : isDisplay
                        ? fontFamily.display
                        : fontFamily.sans,
                    fontSize: fontSize[key],
                    lineHeight: lineHeight[key],
                    fontWeight: isDisplay ? fontWeight.semibold : fontWeight.regular,
                    letterSpacing: isDisplay ? tracking.tight : tracking.normal,
                    color: 'var(--ledger-color-text-primary)',
                    fontFeatureSettings: isMono ? '"tnum","lnum"' : undefined,
                  }}
                >
                  {isMono ? '$1,284,902.47' : 'The quick brown fox jumps over the lazy dog'}
                </div>
              </div>
            );
          })}
        </div>
      </Section>
    );
  },
};

// ---------- Spacing ----------

export const Spacing: Story = {
  render: () => (
    <Section title="Spacing" description="4 px base, 8 px rhythm.">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {Object.entries(space).map(([key, value]) => (
          <div
            key={key}
            style={{
              display: 'grid',
              gridTemplateColumns: '60px 80px 1fr',
              alignItems: 'center',
              gap: 16,
            }}
          >
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: fontSize['mono-sm'],
                color: 'var(--ledger-color-text-muted)',
              }}
            >
              {key}
            </span>
            <span
              style={{
                fontFamily: fontFamily.mono,
                fontSize: fontSize['mono-sm'],
                color: 'var(--ledger-color-text-secondary)',
              }}
            >
              {value}
            </span>
            <div
              style={{
                width: value,
                height: 16,
                background: teal[400],
                borderRadius: radius.xs,
              }}
            />
          </div>
        ))}
      </div>
    </Section>
  ),
};

// ---------- Radius ----------

export const Radius: Story = {
  render: () => (
    <Section
      title="Radius"
      description="Medium throughout. Pills are reserved for status — never CTAs."
    >
      <Grid minWidth={140}>
        {Object.entries(radius).map(([key, value]) => (
          <div key={key} style={{ textAlign: 'center' }}>
            <div
              style={{
                width: 96,
                height: 96,
                margin: '0 auto',
                background: 'var(--ledger-color-surface-raised)',
                border: '1px solid var(--ledger-color-border-default)',
                borderRadius: value,
              }}
            />
            <div
              style={{
                marginTop: 8,
                fontFamily: fontFamily.sans,
                fontSize: fontSize['body-sm'],
                color: 'var(--ledger-color-text-primary)',
              }}
            >
              {key}
            </div>
            <div
              style={{
                fontFamily: fontFamily.mono,
                fontSize: fontSize['mono-sm'],
                color: 'var(--ledger-color-text-muted)',
              }}
            >
              {value}
            </div>
          </div>
        ))}
      </Grid>
    </Section>
  ),
};

// ---------- Shadows ----------

export const Shadows: Story = {
  render: () => (
    <div>
      <Section
        title="Shadow — Light dialect"
        description="Soft, low-chroma drop shadows for the light theme."
      >
        <Grid minWidth={180}>
          {Object.entries(shadowLight).map(([key, value]) => (
            <div
              key={`l-${key}`}
              style={{
                background: '#ffffff',
                borderRadius: radius.md,
                padding: 24,
                boxShadow: value,
                color: obsidian[800],
                fontFamily: fontFamily.sans,
                fontSize: fontSize['body-sm'],
              }}
            >
              elevation.{key}
            </div>
          ))}
        </Grid>
      </Section>
      <Section
        title="Shadow — Dark dialect"
        description="Borders + faint inner highlight; drop shadows are minimal so cards read clearly against obsidian."
      >
        <div
          style={{
            background: obsidian[900],
            padding: 32,
            borderRadius: radius.lg,
          }}
        >
          <Grid minWidth={180}>
            {Object.entries(shadowDark).map(([key, value]) => (
              <div
                key={`d-${key}`}
                style={{
                  background: obsidian[800],
                  borderRadius: radius.md,
                  padding: 24,
                  boxShadow: value,
                  border: `1px solid ${obsidian[700]}`,
                  color: obsidian[0],
                  fontFamily: fontFamily.sans,
                  fontSize: fontSize['body-sm'],
                }}
              >
                elevation.{key}
              </div>
            ))}
          </Grid>
        </div>
      </Section>
    </div>
  ),
};

// ---------- Motion ----------

const MotionDemo: React.FC<{ name: string; durationValue: string; easingValue: string }> = ({
  name,
  durationValue,
  easingValue,
}) => {
  const [on, setOn] = React.useState(false);
  React.useEffect(() => {
    const id = setInterval(() => setOn((v) => !v), 1400);
    return () => clearInterval(id);
  }, []);
  return (
    <div
      style={{
        background: 'var(--ledger-color-surface-raised)',
        border: '1px solid var(--ledger-color-border-subtle)',
        borderRadius: radius.md,
        padding: 16,
      }}
    >
      <div
        style={{
          fontFamily: fontFamily.mono,
          fontSize: fontSize['mono-sm'],
          color: 'var(--ledger-color-text-muted)',
          marginBottom: 12,
        }}
      >
        {name} · {durationValue}
      </div>
      <div
        style={{
          height: 8,
          borderRadius: radius.pill,
          background: 'var(--ledger-color-surface-sunken)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            height: '100%',
            width: on ? '100%' : '0%',
            background: teal[400],
            transition: `width ${durationValue} ${easingValue}`,
          }}
        />
      </div>
    </div>
  );
};

export const Motion: Story = {
  render: () => (
    <Section
      title="Motion"
      description={'Dialect: "settle, don\'t bounce". Decelerate-out curves only.'}
    >
      <Grid minWidth={220}>
        {Object.entries(duration).map(([key, value]) => (
          <MotionDemo
            key={key}
            name={`duration.${key}`}
            durationValue={value}
            easingValue={easing.settle}
          />
        ))}
      </Grid>
    </Section>
  ),
};

// ---------- Focus ----------

export const Focus: Story = {
  render: () => (
    <Section
      title="Focus"
      description="A single 2 px lucid-teal ring with a 2 px offset on every focusable surface. Identity-first, not browser default."
    >
      <div style={{ display: 'flex', gap: 24, flexWrap: 'wrap' }}>
        <button
          style={{
            padding: '10px 20px',
            borderRadius: radius.sm,
            background: teal[500],
            color: obsidian[900],
            fontFamily: fontFamily.sans,
            fontSize: fontSize['body-md'],
            fontWeight: fontWeight.semibold,
            border: 'none',
            outline: 'none',
            boxShadow: `0 0 0 ${focus.ringOffset} var(--ledger-color-surface-canvas), 0 0 0 calc(${focus.ringOffset} + ${focus.ringWidth}) ${focus.ringColor}`,
            cursor: 'pointer',
          }}
        >
          Focused button
        </button>
        <input
          defaultValue="Focused input"
          style={{
            padding: '10px 14px',
            borderRadius: radius.sm,
            border: '1px solid var(--ledger-color-border-default)',
            background: 'var(--ledger-color-surface-raised)',
            color: 'var(--ledger-color-text-primary)',
            fontFamily: fontFamily.sans,
            fontSize: fontSize['body-md'],
            outline: 'none',
            boxShadow: `0 0 0 ${focus.ringOffset} var(--ledger-color-surface-canvas), 0 0 0 calc(${focus.ringOffset} + ${focus.ringWidth}) ${focus.ringColor}`,
          }}
        />
      </div>
    </Section>
  ),
};
