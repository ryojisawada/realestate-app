# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working in this repository.

## プロジェクト概要

（新規プロジェクトのため詳細未記入。プロジェクトの目的・技術スタックが決まり次第、ここに追記してください。）

## Git運用ルール

- **コードに変更を加えるたびに、コミットしてGitHubにプッシュすること。** 変更を溜め込まず、意味のある単位ごとに都度反映する。
- コミットメッセージは変更内容が分かる簡潔な日本語または英語で記述する（「何を」より「なぜ」を意識する）。
- プッシュ先はリモートリポジトリ `origin` の作業ブランチとする。
- `git push --force` や `git reset --hard` など、履歴やリモートの状態を破壊的に変更する操作は行わない。
- コミット前に `git status` / `git diff` で変更内容を確認し、意図しないファイル（`.env` や認証情報など）が含まれていないことを確認する。
- コミットはユーザーの許可なく `--no-verify` などでフックをスキップしない。

## デプロイ情報

- 本番URL：https://realestate-app-lime-eight.vercel.app
- Supabaseプロジェクト名：realestate-app

## 補足

- GitHubリポジトリ：https://github.com/ryojisawada/realestate-app.git（`main`ブランチ）
