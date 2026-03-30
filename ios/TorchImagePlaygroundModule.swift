import ExpoModulesCore
import UIKit

#if canImport(ImagePlayground)
import ImagePlayground
#endif

public class TorchImagePlaygroundModule: Module {
  public func definition() -> ModuleDefinition {
    Name("TorchImagePlayground")

    // Check if device supports Image Playground
    Function("isSupported") { () -> Bool in
      #if canImport(ImagePlayground)
      if #available(iOS 18.2, *) {
        return ImagePlaygroundViewController.isAvailable
      }
      #endif
      return false
    }

    // Launch Image Playground and return generated image URL
    AsyncFunction("launchAsync") { (params: LaunchParams?) async throws -> String? in
      #if canImport(ImagePlayground)
      guard #available(iOS 18.2, *) else {
        throw ImagePlaygroundError.unsupported
      }

      guard ImagePlaygroundViewController.isAvailable else {
        throw ImagePlaygroundError.unsupported
      }

      return try await self.presentImagePlayground(params: params)
      #else
      throw ImagePlaygroundError.unsupported
      #endif
    }
  }

  #if canImport(ImagePlayground)
  @available(iOS 18.2, *)
  private func presentImagePlayground(params: LaunchParams?) async throws -> String? {
    return try await withCheckedThrowingContinuation { continuation in
      DispatchQueue.main.async {
        guard let windowScene = UIApplication.shared.connectedScenes.first as? UIWindowScene,
              let rootViewController = windowScene.windows.first?.rootViewController else {
          continuation.resume(throwing: ImagePlaygroundError.noViewController)
          return
        }

        // Find the topmost presented view controller
        var topController = rootViewController
        while let presented = topController.presentedViewController {
          topController = presented
        }

        let viewController = ImagePlaygroundViewController()

        // Create delegate to handle callbacks
        let delegate = ImagePlaygroundDelegate(
          onComplete: { url in
            topController.dismiss(animated: true)
            continuation.resume(returning: url.path)
          },
          onCancel: {
            topController.dismiss(animated: true)
            continuation.resume(returning: nil)
          }
        )

        // Store delegate to prevent deallocation
        objc_setAssociatedObject(viewController, "delegate", delegate, .OBJC_ASSOCIATION_RETAIN)
        viewController.delegate = delegate

        // Configure concepts if provided
        if let concepts = params?.concepts {
          if let textConcepts = concepts.text {
            for text in textConcepts {
              viewController.concepts.append(.text(text))
            }
          } else if let content = concepts.content {
            viewController.concepts.append(.extracted(from: content, title: concepts.title))
          }
        }

        topController.present(viewController, animated: true)
      }
    }
  }
  #endif
}

// MARK: - Delegate Helper

#if canImport(ImagePlayground)
@available(iOS 18.2, *)
private class ImagePlaygroundDelegate: NSObject, ImagePlaygroundViewController.Delegate {
  private let onComplete: (URL) -> Void
  private let onCancel: () -> Void
  private var hasResumed = false

  init(onComplete: @escaping (URL) -> Void, onCancel: @escaping () -> Void) {
    self.onComplete = onComplete
    self.onCancel = onCancel
    super.init()
  }

  func imagePlaygroundViewController(
    _ imagePlaygroundViewController: ImagePlaygroundViewController,
    didCreateImageAt imageURL: URL
  ) {
    guard !hasResumed else { return }
    hasResumed = true
    onComplete(imageURL)
  }

  func imagePlaygroundViewControllerDidCancel(
    _ imagePlaygroundViewController: ImagePlaygroundViewController
  ) {
    guard !hasResumed else { return }
    hasResumed = true
    onCancel()
  }
}
#endif

// MARK: - Parameter Types

struct ConceptsParams: Record {
  @Field var text: [String]?
  @Field var title: String?
  @Field var content: String?
}

struct LaunchParams: Record {
  @Field var concepts: ConceptsParams?
}

// MARK: - Error Types

enum ImagePlaygroundError: Error {
  case unsupported
  case noViewController
}

extension ImagePlaygroundError: LocalizedError {
  var errorDescription: String? {
    switch self {
    case .unsupported:
      return "Image Playground is not available on this device. Requires iOS 18.2+ and iPhone 15 Pro or newer."
    case .noViewController:
      return "Could not find a view controller to present Image Playground."
    }
  }
}
